const imageFolder = (require.context('../public/images', false, /\.(png|jpe?g|svg)$/));

const images = imageFolder.keys().map((imageName) => {
  return imageFolder(imageName).default;
});
console.log('Image file paths:', imageFolder.keys());
console.log('Loaded images:', images);

export default images;