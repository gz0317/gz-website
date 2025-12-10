let scene, camera, renderer, human;

init();

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // white background

    // Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / 500, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, 500);
    document.getElementById('three-container').appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    // Default human (gray capsule)
    const geometry = new THREE.CapsuleGeometry(0.5, 1.5, 4, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
    human = new THREE.Mesh(geometry, material);
    scene.add(human);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if (human) human.rotation.y += 0.01; // spinning
    renderer.render(scene, camera);
}

// Update human size based on user input
function updateModel() {
    const heightInput = parseFloat(document.getElementById('height').value);
    const weightInput = parseFloat(document.getElementById('weight').value);

    if (!heightInput || !weightInput) {
        alert("Please enter both height and weight.");
        return;
    }

    // Remove old human
    scene.remove(human);

    // Map user input to 3D size
    const heightScale = heightInput / 170; // 170cm = default size
    const weightScale = weightInput / 65;  // 65kg = default size

    // Capsule geometry
    const geometry = new THREE.CapsuleGeometry(0.5 * Math.cbrt(weightScale), 1.5 * heightScale, 4, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
    human = new THREE.Mesh(geometry, material);
    scene.add(human);
}
