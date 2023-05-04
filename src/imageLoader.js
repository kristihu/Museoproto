const imageFolder = require.context(
  "../public/images",
  false,
  /\.(png|jpe?g|svg|mp4)$/
);

const imagess = imageFolder.keys().map((imageName, index) => {
  return {
    id: index,
    image: imageFolder(imageName).default,
    video: imageFolder(`./${imageName.split(".")[0]}.mp4`).default,
  };
});

console.log("Image file paths:", imageFolder.keys());
console.log("Loaded images:", imagess);

export default imagess;
