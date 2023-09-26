const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const filename = file.originalname;
    const imagePath = "/" + filename;
    cb(null, filename);
  },
});

const titles = {
  esityksiä: {
    fi: "Esityksiä",
    en: "Performances",
    sv: "Föreställningar",
  },
  ennenJaNyt: {
    fi: "ennen ja nyt",
    en: "before and now",
    sv: "före och nu",
  },
  lahteetTitles: {
    fi: ["Lähteet", "Esityksen tekijät"],
    en: ["Sources", "Makers?"],
    sv: ["svesrc", "svens?"],
  },
};

const fileFilter = (req, file, cb) => {
  // Accept image files with extensions .jpg, .jpeg, .png and video files with extensions .mp4, .mkv, .avi, .mov, .wmv
  if (
    (file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")) &&
    file.originalname.match(/\.(jpg|jpeg|png|mp4|mkv|avi|mov|wmv)$/i)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only image and video files are allowed."),
      false
    );
  }
};

// Function to delete a file from the server
function deleteFileFromServer(filePath) {
  const relativePath = filePath.replace(/^\/?images\//, "");
  const fullPath = path.join(__dirname, "images", relativePath);

  // Check if the file exists
  if (fs.existsSync(fullPath)) {
    try {
      // Delete the file
      fs.unlinkSync(fullPath);
      console.log(`File deleted: ${fullPath}`);
    } catch (error) {
      console.error(`Error deleting file: ${fullPath}`, error);
      throw new Error("Error deleting file from server");
    }
  } else {
    console.warn(`File not found: ${fullPath}`);
  }
}

const upload = multer({
  storage,
  dest: "images",
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB file size limit
  fileFilter,
});

app.use("/images", express.static(__dirname + "/images"));
// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Vitunhuora12",
  database: "teatteri",
  connectionLimit: 10,
});

// Test the database connection
pool
  .getConnection()
  .then((connection) => {
    console.log(`Connected to MySQL database: ${connection.config.database}`);
    connection.release();
  })
  .catch((error) => {
    console.error("Error connecting to MySQL database: ", error);
  });

// Start the server
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.get("/categories", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const selectedLanguage = req.query.language;

    const translationColumn =
      selectedLanguage === "en"
        ? "name_en"
        : selectedLanguage === "sv"
        ? "name_sv"
        : "name";

    const [rows] = await connection.query(
      `SELECT id, image_path, ${translationColumn} AS name FROM category`
    );

    connection.release();
    res.send(rows);
  } catch (error) {
    console.error("Error fetching categories: ", error);
    res.status(500).send("Error fetching categories");
  }
});

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    let imagePath = req.file.path.replace(/\\/g, "/");

    // If running on Windows, remove the drive letter from the path
    if (process.platform === "win32") {
      imagePath = imagePath.replace(/^[A-Z]:/i, "");
    }

    res.send({ imagePath });
  } catch (error) {
    console.error("Error uploading image: ", error);
    res.status(500).send("Error uploading image");
  }
});

app.post("/subcategories", async (req, res) => {
  try {
    const {
      name,
      name_en,
      name_sv,
      alateksti,
      alateksti_en,
      alateksti_sv,
      image_path,
      category_id,
      vuosi,
    } = req.body;

    if (!image_path) {
      throw new Error("Image path is missing in the request body");
    }

    if (!category_id) {
      throw new Error("Category ID is missing in the request body");
    }

    const formattedImagePath = image_path.startsWith("/")
      ? image_path
      : `/${image_path}`;

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO subcategory (name, name_en, name_sv, alateksti, alateksti_en, alateksti_sv, image_path, category_id,vuosi) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)",
      [
        name,
        name_en,
        name_sv,
        alateksti,
        alateksti_en,
        alateksti_sv,
        formattedImagePath,
        category_id,
        vuosi,
      ]
    );
    connection.release();

    res.send({ id: result.insertId });
  } catch (error) {
    console.error("Error creating subcategory: ", error);
    res.status(500).send("Error creating subcategory");
  }
});

app.post("/media/:subcategoryId", upload.single("file"), async (req, res) => {
  try {
    const {
      imagetext,
      imagetextbold,
      imagetext_en,
      imagetext_sv,
      imagetextbold_en,
      imagetextbold_sv,
    } = req.body;
    const subcategoryId = req.params.subcategoryId;
    let imagePath = null;
    let videoPath = null;

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    if (req.file.mimetype.startsWith("video")) {
      videoPath = req.file.path.replace(/\\/g, "/");
      if (!videoPath.startsWith("/")) {
        videoPath = `/${videoPath}`;
      }
    } else {
      imagePath = req.file.path.replace(/\\/g, "/");
      if (!imagePath.startsWith("/")) {
        imagePath = `/${imagePath}`;
      }
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO media (subcategory_id, image_path, video_path, imagetext, imagetextbold, imagetext_en, imagetext_sv, imagetextbold_en, imagetextbold_sv) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        subcategoryId,
        imagePath,
        videoPath,
        imagetext,
        imagetextbold,
        imagetext_en,
        imagetext_sv,
        imagetextbold_en,
        imagetextbold_sv,
      ]
    );
    connection.release();

    res.send({ id: result.insertId });
  } catch (error) {
    console.error("Error creating media: ", error);
    res.status(500).send("Error creating media");
  }
});

app.put("/subcategories/:id", async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const imagePath = req.body.image_path;
    const name = req.body.name;
    const name_en = req.body.name_en;
    const name_sv = req.body.name_sv;
    const alateksti = req.body.alateksti;
    const alateksti_en = req.body.alateksti_en;
    const alateksti_sv = req.body.alateksti_sv;

    if (!imagePath) {
      throw new Error("Image path is missing in the request body");
    }

    const formattedImagePath = imagePath.startsWith("/")
      ? imagePath
      : `/${imagePath}`;

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE subcategory SET image_path = ?, name = ?, name_en = ?, name_sv = ?, alateksti = ?, alateksti_en = ?, alateksti_sv = ? WHERE id = ?",
      [
        formattedImagePath,
        name,
        name_en,
        name_sv,
        alateksti,
        alateksti_en,
        alateksti_sv,
        subcategoryId,
      ]
    );
    connection.release();

    if (result.affectedRows === 0) {
      throw new Error("Subcategory not found");
    }

    res.send("Subcategory updated successfully");
  } catch (error) {
    console.error("Error updating subcategory: ", error);
    res.status(500).send("Error updating subcategory");
  }
});

app.put("/media/:id", upload.single("file"), async (req, res) => {
  try {
    const mediaId = req.params.id;
    const {
      imagetext,
      imagetextbold,
      imagetext_en,
      imagetext_sv,
      imagetextbold_en,
      imagetextbold_sv,
    } = req.body;

    let imagePath = req.body.image_path || null;
    let videoPath = req.body.video_path || null;

    if (imagePath && !imagePath.startsWith("/")) {
      imagePath = `/${imagePath}`;
    }

    if (req.file) {
      // File was uploaded, handle it
      if (req.file.mimetype.startsWith("video")) {
        videoPath = req.file.path.replace(/\\/g, "/");
        if (!videoPath.startsWith("/")) {
          videoPath = `/${videoPath}`;
        }
      } else {
        imagePath = req.file.path.replace(/\\/g, "/");
        if (!imagePath.startsWith("/")) {
          imagePath = `/${imagePath}`;
        }
      }
    }

    const query =
      "UPDATE media SET image_path = ?, video_path = ?, imagetext = ?, imagetextbold = ?, imagetext_en = ?, imagetext_sv = ?, imagetextbold_en = ?, imagetextbold_sv = ? WHERE id = ?";
    const values = [
      imagePath,
      videoPath,
      imagetext,
      imagetextbold,
      imagetext_en,
      imagetext_sv,
      imagetextbold_en,
      imagetextbold_sv,
      mediaId,
    ];

    await pool.query(query, values);

    res.send("Media updated successfully");
  } catch (error) {
    console.error("Error updating media: ", error);
    res.status(500).send("Error updating media");
  }
});

app.delete("/media/:id/:mediaId", async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const mediaId = req.params.mediaId;

    const query = "DELETE FROM media WHERE subcategory_id = ? AND id = ?";
    const values = [subcategoryId, mediaId];
    await pool.query(query, values);

    res.send(`Media with ID ${mediaId} deleted successfully`);
  } catch (error) {
    console.error("Error deleting media: ", error);
    res.status(500).send("Error deleting media");
  }
});
app.get("/media/:id/:mediaId", async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const mediaId = req.params.mediaId;

    const query = "SELECT * FROM media WHERE subcategory_id = ? AND id = ?";
    const values = [subcategoryId, mediaId];
    const result = await pool.query(query, values);

    if (result.length === 0) {
      return res.status(404).send("Media not found");
    }

    const mediaEntry = result[0];
    res.json(mediaEntry);
  } catch (error) {
    console.error("Error fetching media: ", error);
    res.status(500).send("Error fetching media");
  }
});

app.get("/subcategories", async (req, res) => {
  try {
    const categoryId = req.query.category_id;
    let query =
      "SELECT id, image_path, name, name_en, name_sv, alateksti, alateksti_en, alateksti_sv, category_id, vuosi FROM subcategory";
    let queryParams = [];

    if (categoryId) {
      query += " WHERE category_id = ?";
      queryParams.push(categoryId);
    }

    const connection = await pool.getConnection();
    const [rows] = await connection.query(query, queryParams);
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error("Error fetching subcategories: ", error);
    res.status(500).send("Error fetching subcategories");
  }
});

app.get("/esiintyjat", async (req, res) => {
  try {
    const subcategoryId = req.query.subcategory_id;

    if (!subcategoryId) {
      return res.status(400).send("Missing subcategory_id parameter");
    }

    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT id, esiintyja, hahmo, rooli, subcategory_id FROM esiintyjat WHERE subcategory_id = ?",
      [subcategoryId]
    );
    connection.release();

    res.send(rows);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Error fetching esiintyjat");
  }
});

app.get("/media", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM media");
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error("Error fetching media: ", error);
    res.status(500).send("Error fetching media");
  }
});

app.get("/media/:subcategoryId", async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;

    const connection = await pool.getConnection();

    // Fetch all language translations for media
    const [rows] = await connection.query(
      `SELECT
        id,
        image_path,
        video_path,
        imagetext,
        imagetext_en,
        imagetext_sv,
        imagetextbold ,
        imagetextbold_en,
        imagetextbold_sv
      FROM media WHERE subcategory_id = ?`,
      [subcategoryId]
    );

    connection.release();

    res.send(rows);
  } catch (error) {
    console.error("Error fetching media: ", error);
    res.status(500).send("Error fetching media");
  }
});

app.delete("/subcategories/:id", async (req, res) => {
  try {
    const subcategoryId = req.params.id;

    const connection = await pool.getConnection();

    const [mediaRows] = await connection.query(
      "SELECT image_path, video_path FROM media WHERE subcategory_id = ?",
      [subcategoryId]
    );

    const [result] = await connection.query(
      "DELETE FROM subcategory WHERE id = ?",
      [subcategoryId]
    );

    connection.release();

    if (result.affectedRows === 0) {
      throw new Error("Subcategory not found");
    }

    for (const media of mediaRows) {
      if (media.image_path) {
        deleteFileFromServer(media.image_path);
      }
      if (media.video_path) {
        deleteFileFromServer(media.video_path);
      }
    }

    res.send("Subcategory and related media deleted successfully");
  } catch (error) {
    console.error("Error deleting subcategory and related media: ", error);
    res.status(500).send("Error deleting subcategory and related media");
  }
});

app.get("/contenttext", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT subcategory_id, text, text_en, text_sv FROM contenttext"
    );
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error("Error fetching contenttext: ", error);
    res.status(500).send("Error fetching contenttext");
  }
});
app.get("/contenttext/:subcategoryId", async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT subcategory_id, text, text_en, text_sv FROM contenttext WHERE subcategory_id = ?",
      [subcategoryId]
    );
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error("Error fetching contenttext: ", error);
    res.status(500).send("Error fetching contenttext");
  }
});

app.get("/lahteet/:subcategoryId", async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM lahteet WHERE subcategory_id = ?",
      [subcategoryId]
    );
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error("error fetching lahteet", error);
    res.status(500).send("error fetching lahteet");
  }
});

app.post("/lahteet", async (req, res) => {
  try {
    const {
      tekijat,
      esiintyjat,
      esiintyjat_en,
      esiintyjat_sv,
      lahteet,
      subcategory_id,
    } = req.body;

    const connection = await pool.getConnection();
    const query =
      "INSERT INTO lahteet (tekijat, esiintyjat, esiintyjat_en, esiintyjat_sv, lahteet, subcategory_id) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      tekijat,
      esiintyjat,
      esiintyjat_en,
      esiintyjat_sv,
      lahteet,
      subcategory_id,
    ];

    await connection.query(query, values);
    connection.release();

    res.send("Entry added successfully");
  } catch (error) {
    console.error("error adding entry", error);
    res.status(500).send("error adding entry");
  }
});
app.put("/lahteet/:subcategory_id", async (req, res) => {
  try {
    const subcategoryId = req.params.subcategory_id;
    const newLahteetData = {
      tekijat: req.body.tekijat,
      esiintyjat: req.body.esiintyjat,
      esiintyjat_en: req.body.esiintyjat_en,
      esiintyjat_sv: req.body.esiintyjat_sv,
      lahteet: req.body.lahteet,
    };

    console.log(
      "Updating lahteet for subcategory:",
      subcategoryId,
      newLahteetData
    );

    if (!newLahteetData.tekijat) {
      throw new Error("Tekijat is missing in the request body");
    }

    const connection = await pool.getConnection();

    const [existingEntry] = await connection.query(
      "SELECT * FROM lahteet WHERE subcategory_id = ?",
      [subcategoryId]
    );

    if (!existingEntry.length) {
      connection.release();
      return res.status(404).send("Lahteet not found");
    }

    await connection.query(
      "UPDATE lahteet SET tekijat = ?, esiintyjat = ?, esiintyjat_en = ?, esiintyjat_sv = ?, lahteet = ? WHERE subcategory_id = ?",
      [
        newLahteetData.tekijat,
        newLahteetData.esiintyjat,
        newLahteetData.esiintyjat_en,
        newLahteetData.esiintyjat_sv,
        newLahteetData.lahteet,
        subcategoryId,
      ]
    );

    connection.release();
    console.log("Lahteet updated successfully");
    res.send("Lahteet updated successfully");
  } catch (error) {
    console.error("Error updating lahteet: ", error);
    res.status(500).send("Error updating lahteet");
  }
});

app.post("/contenttext/:subcategoryId", async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const { text, text_en, text_sv } = req.body;
    console.log(
      "Creating content text:",
      subcategoryId,
      text,
      text_en,
      text_sv
    );

    if (!text) {
      throw new Error("Content text is missing in the request body");
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO contenttext (text, subcategory_id, text_en, text_sv) VALUES (?, ?, ?, ?)",
      [text, subcategoryId, text_en, text_sv]
    );
    connection.release();

    res.send({ id: result.insertId });
  } catch (error) {
    console.error("Error creating content text: ", error);
    res.status(500).send("Error creating content text");
  }
});

app.put("/contenttext/:id", async (req, res) => {
  try {
    const contenttextId = req.params.id;
    const text = req.body.text;
    const text_en = req.body.text_en;
    const text_sv = req.body.text_sv;

    console.log("Updating content text:", contenttextId, text);

    if (!text) {
      throw new Error("Content text is missing in the request body");
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE contenttext SET text = ?, text_en = ?, text_sv = ? WHERE subcategory_id = ?",
      [text, text_en, text_sv, contenttextId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      throw new Error("ContentText not found");
    }

    console.log("Content text updated successfully");

    res.send("ContentText updated successfully");
  } catch (error) {
    console.error("Error updating contenttext: ", error);
    res.status(500).send("Error updating contenttext");
  }
});

app.get("/subcategories/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const selectedLanguage = req.query.language;

    const translationColumns = [
      "name",
      "name_en",
      "name_sv",
      "alateksti",
      "alateksti_en",
      "alateksti_sv",
      "vuosi",
    ];

    const selectedTranslationColumn = translationColumns.includes(
      `name_${selectedLanguage}`
    )
      ? `name_${selectedLanguage}`
      : "name";

    const selectedAlatekstiColumn = translationColumns.includes(
      `alateksti_${selectedLanguage}`
    )
      ? `alateksti_${selectedLanguage}`
      : "alateksti";

    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      `SELECT id, image_path, ${selectedTranslationColumn} AS name, category_id, ${selectedAlatekstiColumn} AS alateksti FROM subcategory WHERE category_id = ?`,
      [categoryId]
    );
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error("Error fetching subcategories: ", error);
    res.status(500).send("Error fetching subcategories");
  }
});
app.get("/subcategory/:subcategoryId", async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const selectedLanguage = req.query.language;

    const translationColumns = [
      "name",
      "name_en",
      "name_sv",
      "alateksti",
      "alateksti_en",
      "alateksti_sv",
      "vuosi",
    ];

    const selectedTranslationColumn = translationColumns.includes(
      `name_${selectedLanguage}`
    )
      ? `name_${selectedLanguage}`
      : "name";

    const selectedAlatekstiColumn = translationColumns.includes(
      `alateksti_${selectedLanguage}`
    )
      ? `alateksti_${selectedLanguage}`
      : "alateksti";

    const connection = await pool.getConnection();
    const [row] = await connection.query(
      `SELECT id, ${selectedTranslationColumn} AS name, image_path, category_id, name_en, name_sv, ${selectedAlatekstiColumn} AS alateksti, alateksti_en, alateksti_sv, vuosi FROM subcategory WHERE id = ?`,
      [subcategoryId]
    );
    connection.release();

    if (!row) {
      return res.status(404).send("Subcategory not found");
    }

    res.send(row);
  } catch (error) {
    console.error("Error fetching subcategory: ", error);
    res.status(500).send("Error fetching subcategory");
  }
});

io.on("connection", async (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("initialFetch", async (language) => {
    try {
      const connection = await pool.getConnection();
      const translationColumn =
        language === "en" ? "name_en" : language === "sv" ? "name_sv" : "name";
      const [rows] = await connection.query(
        `SELECT id, image_path, ${translationColumn} AS name FROM category`
      );
      connection.release();
      io.emit("displayCategories", rows);
      const defaultLanguage =
        language === "en" || language === "sv" ? language : "fi";
      const selectedTitle = titles.esityksiä[defaultLanguage];
      const selectedSubtitle = titles.ennenJaNyt[defaultLanguage];
      const lahdeTitles = titles.lahteetTitles[defaultLanguage];
      io.emit("displayTitle", selectedTitle);
      io.emit("displaySubtitle", selectedSubtitle);
      io.emit("displayLahteetTitles", lahdeTitles);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  });

  socket.on("categoryClicked", async ({ categoryId, selectedLanguage }) => {
    try {
      const connection = await pool.getConnection();

      const alatekstiTranslationColumn =
        selectedLanguage === "en"
          ? "alateksti_en"
          : selectedLanguage === "sv"
          ? "alateksti_sv"
          : "alateksti";

      const translationColumn =
        selectedLanguage === "en"
          ? "name_en"
          : selectedLanguage === "sv"
          ? "name_sv"
          : "name";

      const query = `
      SELECT id, image_path, ?? AS name, ?? AS alateksti, vuosi
      FROM subcategory
      WHERE category_id = ?
    `;

      const queryParams = [
        translationColumn,
        alatekstiTranslationColumn,
        categoryId,
      ];
      const [rows] = await connection.query(query, queryParams);
      const categoryQuery = `
      SELECT
        name,
        ${translationColumn} AS name
      FROM category
      WHERE id = ?
    `;
      const [categoryInfo] = await connection.query(categoryQuery, [
        categoryId,
      ]);
      io.emit("displaySubcategories", { subcategories: rows, categoryInfo });
      connection.release();
    } catch (error) {
      console.error(
        `Error fetching subcategories for category ${categoryId}: `,
        error
      );
    }
  });

  socket.on(
    "subcategoryClicked",
    async ({ subcategoryId, selectedLanguage }) => {
      try {
        const connection = await pool.getConnection();

        const textTranslationColumn =
          selectedLanguage === "en"
            ? "imagetext_en"
            : selectedLanguage === "sv"
            ? "imagetext_sv"
            : "imagetext";

        const boldTextTranslationColumn =
          selectedLanguage === "en"
            ? "imagetextbold_en"
            : selectedLanguage === "sv"
            ? "imagetextbold_sv"
            : "imagetextbold";

        const subcategoryNameColumn =
          selectedLanguage === "en"
            ? "name_en"
            : selectedLanguage === "sv"
            ? "name_sv"
            : "name";

        const alatekstiColumn =
          selectedLanguage === "en"
            ? "alateksti_en"
            : selectedLanguage === "sv"
            ? "alateksti_sv"
            : "alateksti";

        const contentTextColumn =
          selectedLanguage === "en"
            ? "text_en"
            : selectedLanguage === "sv"
            ? "text_sv"
            : "text";

        const esiintyjatColumn =
          selectedLanguage === "en"
            ? "esiintyjat_en"
            : selectedLanguage === "sv"
            ? "esiintyjat_sv"
            : "esiintyjat";

        const mediaQuery = `SELECT id, image_path, video_path, ${textTranslationColumn} AS imagetext, ${boldTextTranslationColumn} AS imagetextbold, quality, subcategory_id FROM media WHERE subcategory_id = ?`;

        const contenttextQuery = `SELECT ${contentTextColumn} AS text FROM contenttext WHERE subcategory_id = ?`;
        const esiintyjatQuery =
          "SELECT id, esiintyja, hahmo, rooli, subcategory_id FROM esiintyjat WHERE subcategory_id = ?";
        const subcategoryQuery = `SELECT ${subcategoryNameColumn} AS name, ${alatekstiColumn} AS alateksti FROM subcategory WHERE id = ?`;
        const lahteetQuery = `SELECT tekijat, ${esiintyjatColumn} AS esiintyjat, lahteet FROM lahteet WHERE subcategory_id = ?`;

        const [mediaRows] = await connection.query(mediaQuery, [subcategoryId]);
        const [contenttextRows] = await connection.query(contenttextQuery, [
          subcategoryId,
        ]);
        const [esiintyjatRows] = await connection.query(esiintyjatQuery, [
          subcategoryId,
        ]);
        const [subcategoryRows] = await connection.query(subcategoryQuery, [
          subcategoryId,
        ]);
        const [lahteetRows] = await connection.query(lahteetQuery, [
          subcategoryId,
        ]);

        connection.release();

        io.emit("displayContent", {
          media: mediaRows,
          contenttext: contenttextRows,
          authors: esiintyjatRows,
          subTitle: subcategoryRows[0].name,
          lahteet: lahteetRows,
          subTitle2: subcategoryRows[0].alateksti,
        });
      } catch (error) {
        console.error(
          `Error fetching content for subcategory ${subcategoryId}: `,
          error
        );
      }
    }
  );

  socket.on("carouselToggled", (play) => {
    io.emit("carouselToggled", play);
  });

  socket.on("imageClicked", async (subcategoryId, index) => {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        "SELECT image_path, imagetext, imagetextbold, video_path, quality FROM media WHERE subcategory_id = ?",
        [subcategoryId]
      );
      connection.release();

      const selectedItem = rows[index];

      if (selectedItem) {
        if (selectedItem.video_path) {
          console.log("Play video:", selectedItem.video_path);
          io.emit("playVideo", {
            video_path: selectedItem.video_path,
            quality: selectedItem.quality,
          });
        } else if (selectedItem.image_path) {
          const images = rows.map((row) => ({
            image_path: row.image_path,
            imagetext: row.imagetext,
            imagetextbold: row.imagetextbold,
          }));
          io.emit("displayImageAtIndex", {
            index,
            images,
            subcategory_id: subcategoryId,
          });
        }
      }
    } catch (error) {
      console.error(
        `Error fetching images for subcategory ${subcategoryId}: `,
        error
      );
    }
  });

  socket.on("subcategoryChanged", () => {
    io.emit("resetProjector");
  });

  socket.on("backClicked", async ({ categoryId, selectedLanguage }) => {
    try {
      const connection = await pool.getConnection();
      const translationColumn =
        selectedLanguage === "en"
          ? "name_en"
          : selectedLanguage === "sv"
          ? "name_sv"
          : "name"; // Default to the original name column (Finnish)

      const alatekstiColumn =
        selectedLanguage === "en"
          ? "alateksti_en"
          : selectedLanguage === "sv"
          ? "alateksti_sv"
          : "alateksti";
      const query = `SELECT id, image_path, ?? AS name, ?? as alateksti, vuosi FROM subcategory WHERE category_id = ?`;
      const queryParams = [translationColumn, alatekstiColumn, categoryId];
      const [rows] = await connection.query(query, queryParams);
      const categoryQuery = `
      SELECT
        name,
        ${translationColumn} AS name
      FROM category
      WHERE id = ?
    `;
      const [categoryInfo] = await connection.query(categoryQuery, [
        categoryId,
      ]);
      connection.release();
      io.emit("displaySubcategoriesOnBack", {
        subcategories: rows,
        categoryInfo,
      });
    } catch (error) {
      console.error(
        `Error fetching subcategories for category ${categoryId}: `,
        error
      );
    }
  });

  socket.on("toggleCarousel", () => {
    io.emit("carouselToggled");
  });

  socket.on("languageIconClicked", () => {
    io.emit("resetProjector");
    io.emit("displayCategoriesOnHome", []);
  });
  socket.on("homeClicked", async (selectedLanguage) => {
    try {
      const connection = await pool.getConnection();
      const translationColumn =
        selectedLanguage === "en"
          ? "name_en"
          : selectedLanguage === "sv"
          ? "name_sv"
          : "name";
      const query = `SELECT id, image_path, ?? AS name FROM category`;
      const queryParams = [translationColumn];
      const [rows] = await connection.query(query, queryParams);
      connection.release();
      io.emit("displayCategoriesOnHome", rows);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
