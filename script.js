let scene, camera, renderer, human;

// Initialize Three.js scene
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / 500, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, 500);
    document.getElementById('three-container').appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    // Default human capsule
    const geometry = new THREE.CapsuleGeometry(0.5, 1.5, 4, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
    human = new THREE.Mesh(geometry, material);
    scene.add(human);

    animate();
}

// Animate the model
function animate() {
    requestAnimationFrame(animate);
    if (human) human.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// Update human based on user input
function updateModel() {
    const heightInput = parseFloat(document.getElementById('height').value);
    const weightInput = parseFloat(document.getElementById('weight').value);

    if (!heightInput || !weightInput) {
        alert("Please enter both height and weight.");
        return;
    }

    // Remove previous model
    scene.remove(human);

    // Scale model based on inputs
    const heightScale = heightInput / 170;
    const weightScale = weightInput / 65;

    const geometry = new THREE.CapsuleGeometry(0.5 * Math.cbrt(weightScale), 1.5 * heightScale, 4, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
    human = new THREE.Mesh(geometry, material);
    scene.add(human);
}

// Event listener for button
document.addEventListener("DOMContentLoaded", () => {
    init();
    document.getElementById('showBtn').addEventListener('click', updateModel);
});
