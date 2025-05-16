async function main() {
    const canvas = document.querySelector('#container');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    // const nextColors = [new THREE.Vector4(0.559, 0.21, 0.257, 1.0), new THREE.Vector4(0.988, 0.149, 0.259, 1.0), new THREE.Vector4(0.82, 0.267, 0.337, 1.0)];
    // const firstColors = [new THREE.Vector4(0.1, 0.1, 0.1, 1.0), new THREE.Vector4(0.3, 0.3, 0.3, 1.0), new THREE.Vector4(0.2, 0.2, 0.2, 1.0)];

    renderer.autoClearColor = false;

    const camera = new THREE.OrthographicCamera(
        -1, // left
        1, // right
        1, // top
        -1, // bottom
        -1, // near,
        1, // far
    );
    const scene = new THREE.Scene();
    const plane = new THREE.PlaneGeometry(2, 2);
    const fragmentShader = await (await fetch("shaders/balatro.frag")).text();
    const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3() },

        SPIN_ROTATION: { value: .2 },
        SPIN_SPEED: { value: 1.0 },
        COLOUR_1: {value: new THREE.Vector4(0.1, 0.1, 0.1, 1.0)},
        COLOUR_2: {value: new THREE.Vector4(0.3, 0.3, 0.3, 1.0)},
        COLOUR_3: {value: new THREE.Vector4(0.2, 0.2, 0.2, 1.0)}
    };
    const material = new THREE.ShaderMaterial({
        fragmentShader,
        uniforms,
    });
    scene.add(new THREE.Mesh(plane, material));

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        time *= 0.001;  // convert to seconds

        resizeRendererToDisplaySize(renderer);

        const canvas = renderer.domElement;
        uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
        uniforms.iTime.value = time;

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();