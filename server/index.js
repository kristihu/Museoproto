const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");
const path = require("path");

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
    const imagePath = "/" + filename; // Use the original filename
    cb(null, filename);
  },
});
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

const upload = multer({
  storage,
  dest: "images", // Specify the destination directory for uploaded files
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB file size limit
  fileFilter,
});

app.use("/images", express.static(__dirname + "/images"));
// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: "",
  user: "",
  password: "",
  database: "",
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
    const [rows] = await connection.query(
      "SELECT id, image_path, name FROM category"
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
    let imagePath = req.file.path.replace(/\\/g, "/"); // Replace backslashes with forward slashes

    // If running on Windows, remove the drive letter from the path
    if (process.platform === "win32") {
      imagePath = imagePath.replace(/^[A-Z]:/i, "");
    }

    // Return the updated image path in the response
    res.send({ imagePath });
  } catch (error) {
    console.error("Error uploading image: ", error);
    res.status(500).send("Error uploading image");
  }
});

app.post("/subcategories", async (req, res) => {
  try {
    const name = req.body.name;
    const imagePath = req.body.image_path;
    const categoryId = req.body.category_id;

    if (!imagePath) {
      throw new Error("Image path is missing in the request body");
    }

    if (!categoryId) {
      throw new Error("Category ID is missing in the request body");
    }

    const formattedImagePath = imagePath.startsWith("/")
      ? imagePath
      : `/${imagePath}`;

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO subcategory (name, image_path, category_id) VALUES (?, ?, ?)",
      [name, formattedImagePath, categoryId]
    );
    connection.release();

    // Send the new subcategory's ID in the response
    res.send({ id: result.insertId });
  } catch (error) {
    console.error("Error creating subcategory: ", error);
    res.status(500).send("Error creating subcategory");
  }
});

app.post("/media/:subcategoryId", upload.single("file"), async (req, res) => {
  try {
    const { imagetext, imagetextbold } = req.body;
    const subcategoryId = req.params.subcategoryId;
    let imagePath = null;
    let videoPath = null;

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    if (req.file.mimetype.startsWith("video")) {
      // Uploaded file is a video
      videoPath = req.file.path.replace(/\\/g, "/");
      if (!videoPath.startsWith("/")) {
        videoPath = `/${videoPath}`;
      }
    } else {
      // Uploaded file is an image
      imagePath = req.file.path.replace(/\\/g, "/");
      if (!imagePath.startsWith("/")) {
        imagePath = `/${imagePath}`;
      }
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO media (subcategory_id, image_path, video_path, imagetext, imagetextbold) VALUES (?, ?, ?, ?, ?)",
      [subcategoryId, imagePath, videoPath, imagetext, imagetextbold]
    );
    connection.release();

    // Send the new media's ID in the response
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

    if (!imagePath) {
      throw new Error("Image path is missing in the request body");
    }

    // Add a leading slash to the image path if it doesn't have one
    const formattedImagePath = imagePath.startsWith("/")
      ? imagePath
      : `/${imagePath}`;

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE subcategory SET image_path = ?, name = ? WHERE id = ?",
      [formattedImagePath, name, subcategoryId]
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
    const { imagetext, imagetextbold } = req.body;
    let imagePath = null;
    let videoPath = null;

    // Check if a new file is uploaded
    if (req.file) {
      if (req.file.mimetype.startsWith("video")) {
        // Uploaded file is a video
        videoPath = req.file.path.replace(/\\/g, "/");
        if (!videoPath.startsWith("/")) {
          videoPath = `/${videoPath}`;
        }
      } else {
        // Uploaded file is an image
        imagePath = req.file.path.replace(/\\/g, "/");
        if (!imagePath.startsWith("/")) {
          imagePath = `/${imagePath}`;
        }
      }
    }

    const query =
      "UPDATE media SET image_path = ?, video_path = ?, imagetext = ?, imagetextbold = ? WHERE id = ?";
    const values = [imagePath, videoPath, imagetext, imagetextbold, mediaId];

    await pool.query(query, values);

    res.send("Media updated successfully");
  } catch (error) {
    console.error("Error updating media: ", error);
    res.status(500).send("Error updating media");
  }
});

app.get("/subcategories", async (req, res) => {
  try {
    const categoryId = req.query.category_id;
    let query = "SELECT id, image_path, name, category_id FROM subcategory";
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
    const [rows] = await connection.query(
      "SELECT * FROM media WHERE subcategory_id = ?",
      [subcategoryId]
    );
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error("Error fetching media: ", error);
    res.status(500).send("Error fetching media");
  }
});

app.get("/contenttext", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM contenttext");
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
      "SELECT * FROM contenttext WHERE subcategory_id = ?",
      [subcategoryId]
    );
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error("Error fetching contenttext: ", error);
    res.status(500).send("Error fetching contenttext");
  }
});

app.post("/contenttext/:subcategoryId", async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const { text } = req.body;
    console.log("Updating content text:", subcategoryId, text);

    if (!text) {
      throw new Error("Content text is missing in the request body");
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO contenttext (subcategory_id, text) VALUES (?, ?)",
      [subcategoryId, text]
    );
    connection.release();

    // Send the new content text's ID in the response
    res.send({ id: result.insertId });
  } catch (error) {
    console.error("Error creating content text: ", error);
    res.status(500).send("Error creating content text");
  }
});

app.put("/contenttext/:id", async (req, res) => {
  try {
    const contenttextId = req.params.id;
    const { text } = req.body;

    console.log("Updating content text:", contenttextId, text);

    if (!text) {
      throw new Error("Content text is missing in the request body");
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "UPDATE contenttext SET text = ? WHERE subcategory_id = ?",
      [text, contenttextId]
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
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT id, image_path, name, category_id FROM subcategory WHERE category_id = ?",
      [categoryId]
    );
    connection.release();
    res.send(rows);
  } catch (error) {
    console.error("Error fetching subcategories: ", error);
    res.status(500).send("Error fetching subcategories");
  }
});

io.on("connection", async (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("initialFetch", async () => {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        "SELECT id, image_path, name FROM category"
      );
      connection.release();
      io.emit("displayCategories", rows);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  });

  socket.on("categoryClicked", async (categoryId) => {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        "SELECT id, image_path, name FROM subcategory WHERE category_id = ?",
        [categoryId]
      );
      connection.release();
      io.emit("displaySubcategories", rows);
    } catch (error) {
      console.error(
        `Error fetching subcategories for category ${categoryId}: `,
        error
      );
    }
  });

  socket.on("subcategoryClicked", async (subcategoryId) => {
    try {
      const connection = await pool.getConnection();
      const [mediaRows] = await connection.query(
        "SELECT * FROM media WHERE subcategory_id = ?",
        [subcategoryId]
      );
      const [contenttextRows] = await connection.query(
        "SELECT * FROM contenttext WHERE subcategory_id = ?",
        [subcategoryId]
      );
      connection.release();
      io.emit("displayContent", {
        media: mediaRows,
        contenttext: contenttextRows,
      });
    } catch (error) {
      console.error(
        `Error fetching content for subcategory ${subcategoryId}: `,
        error
      );
    }
  });

  socket.on("imageClicked", async (subcategoryId, index) => {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        "SELECT image_path, imagetext, imagetextbold, video_path FROM media WHERE subcategory_id = ?",
        [subcategoryId]
      );
      connection.release();

      const selectedItem = rows[index];
      if (selectedItem.video_path) {
        console.log("click", selectedItem.video_path);
        io.emit("playVideo", selectedItem.video_path);
      } else {
        const images = rows.map((row) => ({
          image_path: row.image_path,
          imagetext: row.imagetext,
          imagetextbold: row.imagetextbold,
        }));
        io.emit("displayImageAtIndex", {
          index,
          images,
        });
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

  socket.on("backClicked", async (categoryId) => {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        "SELECT id, image_path, name FROM subcategory WHERE category_id = ?",
        [categoryId]
      );
      connection.release();
      io.emit("displaySubcategoriesOnBack", rows);
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
  socket.on("homeClicked", async () => {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        "SELECT id, image_path, name FROM category"
      );
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
