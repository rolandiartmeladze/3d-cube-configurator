const textureSelect = document.querySelector('#textureSelect');
const texturePreview = document.getElementById('texturePreview');

const material = {
  colros: '/textures/example.webp',
  wood: '/textures/wood.jpg',
  metal: '/textures/metal.jpg',
  ice: '/textures/ice.jpg',
};

export function setupTextureSwitcher(onTextureChange) {
  textureSelect.addEventListener('change', (event) => {
    const selected = event.target.value;

    onTextureChange(selected);

    const selectedMaterial = material[selected];
    if (selectedMaterial) {
      texturePreview.src = selectedMaterial;
    }
  });
}
