const textureSelect = document.querySelector('#textureSelect');
const texturePreview = document.getElementById('texturePreview');
const textureLabel = document.getElementById('textureLabel');

const previewInfo = {
  none: {
    src: '/textures/example.webp',
    label: 'Colors Texture',
  },
  wood: {
    src: '/textures/wood.jpg',
    label: 'Wood Texture',
  },
  metal: {
    src: '/textures/metal.jpg',
    label: 'Metal Texture',
  },
  ice: {
    src: '/textures/ice.jpg',
    label: 'Ice Texture',
  },
};

export function setupTextureSwitcher(onTextureChange) {
  textureSelect.addEventListener('change', (event) => {
    const selected = event.target.value;

    onTextureChange(selected);

    const preview = previewInfo[selected];
    if (preview) {
      texturePreview.src = preview.src;
      textureLabel.textContent = preview.label;
    }
  });
}
