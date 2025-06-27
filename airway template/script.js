function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { 
            value: value, 
            enumerable: true, 
            configurable: true, 
            writable: true 
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

// Clear console for clean output
console.clear();

class Scene {
    constructor(model) {
        _defineProperty(this, "render", () => {
            for (var ii = 0; ii < this.views.length; ++ii) {
                var view = this.views[ii];
                var camera = view.camera;
                var bottom = Math.floor(this.h * view.bottom);
                var height = Math.floor(this.h * view.height);
                this.renderer.setViewport(0, 0, this.w, this.h);
                this.renderer.setScissor(0, bottom, this.w, height);
                this.renderer.setScissorTest(true);
                camera.aspect = this.w / this.h;
                this.renderer.render(this.scene, camera);
            }
        });

        _defineProperty(this, "onResize", () => {
            this.w = window.innerWidth;
            this.h = window.innerHeight;
            for (var ii = 0; ii < this.views.length; ++ii) {
                var view = this.views[ii];
                var camera = view.camera;
                camera.aspect = this.w / this.h;
                let camZ = (screen.width - this.w * 1) / 3;
                camera.position.z = camZ < 180 ? 180 : camZ;
                camera.updateProjectionMatrix();
            }
            this.renderer.setSize(this.w, this.h);
            this.render();
        });

        // Initialize views for different render modes
        this.views = [{ bottom: 0, height: 1 }, { bottom: 0, height: 0 }];
        
        // Setup WebGL renderer with enhanced settings
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);

        // Create main scene
        this.scene = new THREE.Scene();

        // Setup cameras for each view
        for (var _ii = 0; _ii < this.views.length; ++_ii) {
            var _view = this.views[_ii];
            var _camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
            _camera.position.fromArray([0, 0, 180]);
            _camera.layers.disableAll();
            _camera.layers.enable(_ii);
            _view.camera = _camera;
            _camera.lookAt(new THREE.Vector3(0, 5, 0));
        }

        // Enhanced lighting setup for realistic aircraft appearance
        this.light = new THREE.PointLight(0xFFFFFF, 1.0);
        this.light.position.z = 200;
        this.light.position.x = 100;
        this.light.position.y = -30;
        this.light.castShadow = true;
        this.light.shadow.mapSize.width = 2048;
        this.light.shadow.mapSize.height = 2048;
        this.scene.add(this.light);

        // Ambient lighting for overall illumination
        this.softLight = new THREE.AmbientLight(0xF0F8FF, 0.6);
        this.scene.add(this.softLight);

        // Directional light simulating sunlight
        this.sunLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
        this.sunLight.position.set(200, 200, 100);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.mapSize.width = 2048;
        this.sunLight.shadow.mapSize.height = 2048;
        this.sunLight.shadow.camera.near = 0.5;
        this.sunLight.shadow.camera.far = 500;
        this.scene.add(this.sunLight);

        // Additional rim lighting for Shiva's Airways orange highlights
        this.rimLight = new THREE.DirectionalLight(0xE67E22, 0.4);
        this.rimLight.position.set(-150, 150, 150);
        this.scene.add(this.rimLight);

        // Key light for dramatic effect with orange highlights
        this.keyLight = new THREE.SpotLight(0xFFE4B5, 0.6, 1000, Math.PI / 8, 0.1);
        this.keyLight.position.set(200, 200, 200);
        this.keyLight.target.position.set(0, 0, 0);
        this.keyLight.castShadow = true;
        this.scene.add(this.keyLight);
        this.scene.add(this.keyLight.target);

        // Environment lighting for realistic reflections
        this.envLight = new THREE.HemisphereLight(0x87CEEB, 0x362C1A, 0.3);
        this.scene.add(this.envLight);

        // Setup resize handling
        this.onResize();
        window.addEventListener('resize', this.onResize, false);

        // Create enhanced wireframe edges with realistic aircraft details
        var edges = new THREE.EdgesGeometry(model.children[0].geometry);
        let line = new THREE.LineSegments(edges);
        line.material.depthTest = false;
        line.material.opacity = 0.2;
        line.material.transparent = true;
        line.material.color.setHex(0x888888); // Subtle gray wireframe
        line.material.linewidth = 1;
        line.position.x = 0.1;
        line.position.z = -0.1;
        line.position.y = 0.05;

        // Scale the entire model group to make airplane larger
        this.modelGroup = new THREE.Group();
        this.modelGroup.scale.set(1.8, 1.8, 1.8); // Make airplane 80% larger
        
        model.layers.set(0);
        line.layers.set(1);
        this.modelGroup.add(model);
        this.modelGroup.add(line);
        this.scene.add(this.modelGroup);
    }
}

function loadModel() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(DrawSVGPlugin);
    
    // Initialize SVG animations
    gsap.set('#line-length', { drawSVG: 0 });
    gsap.set('#line-wingspan', { drawSVG: 0 });
    gsap.set('#circle-phalange', { drawSVG: 0 });

    var object;

    function onModelLoaded() {
        object.traverse(function (child) {
            if (child.isMesh) {
                // Create realistic airplane materials for Shiva's Airways
                let mat;
                
                // Check if this is likely the main fuselage/body
                if (child.geometry.attributes.position.count > 1000) {
                    // Main aircraft body - Shiva's Airways livery colors
                    mat = new THREE.MeshPhongMaterial({
                        color: 0xF8F9FA,           // Clean white base
                        specular: 0xFFFFFF,        // Bright white specular
                        shininess: 85,             // High shine for metallic look
                        flatShading: false,
                        transparent: false,
                        opacity: 1.0,
                        reflectivity: 0.4,
                        combine: THREE.MultiplyOperation
                    });
                } else {
                    // Smaller parts - engines, landing gear, details
                    mat = new THREE.MeshPhongMaterial({
                        color: 0x2C3E50,           // Dark blue-gray details
                        specular: 0xBDC3C7,        // Silver specular
                        shininess: 60,
                        flatShading: false,
                        transparent: false,
                        opacity: 1.0,
                        reflectivity: 0.3,
                        combine: THREE.MultiplyOperation
                    });
                }
                
                child.material = mat;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
        // Add custom Shiva's Airways livery elements after model loads
        addShivasLivery(object);
        setupAnimation(object);
    }
    
    function addShivasLivery(aircraft) {
        // Create Shiva's Airways signature orange accent stripes
        const stripeGeometry = new THREE.PlaneGeometry(15, 0.8);
        const stripeMaterial = new THREE.MeshPhongMaterial({
            color: 0xE67E22,               // Shiva's Airways orange
            specular: 0xF39C12,            // Bright orange specular
            shininess: 100,
            transparent: false,
            side: THREE.DoubleSide
        });
        
        // Add orange stripe along fuselage
        const stripe1 = new THREE.Mesh(stripeGeometry, stripeMaterial);
        stripe1.position.set(0, 0.2, 0.1);
        stripe1.rotation.y = Math.PI / 2;
        aircraft.add(stripe1);
        
        // Add second orange accent
        const stripe2 = new THREE.Mesh(stripeGeometry, stripeMaterial);
        stripe2.position.set(0, -0.8, 0.1);
        stripe2.rotation.y = Math.PI / 2;
        stripe2.scale.set(0.8, 0.6, 1);
        aircraft.add(stripe2);
        
        // Create engine details with realistic colors
        const engineGeometry = new THREE.CylinderGeometry(0.4, 0.5, 2, 16);
        const engineMaterial = new THREE.MeshPhongMaterial({
            color: 0x1A1A1A,               // Dark engine color
            specular: 0x666666,            // Metallic specular
            shininess: 40,
            transparent: false
        });
        
        // Add engine details (simplified representation)
        const leftEngine = new THREE.Mesh(engineGeometry, engineMaterial);
        leftEngine.position.set(-3, -0.5, -1);
        leftEngine.rotation.z = Math.PI / 2;
        aircraft.add(leftEngine);
        
        const rightEngine = new THREE.Mesh(engineGeometry, engineMaterial);
        rightEngine.position.set(3, -0.5, -1);
        rightEngine.rotation.z = Math.PI / 2;
        aircraft.add(rightEngine);
        
        // Add wing tip details with Shiva's Airways colors
        const wingTipGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        const wingTipMaterial = new THREE.MeshPhongMaterial({
            color: 0xE74C3C,               // Deep red accent
            specular: 0xEC7063,            // Red specular
            shininess: 70
        });
        
        const leftWingTip = new THREE.Mesh(wingTipGeometry, wingTipMaterial);
        leftWingTip.position.set(-6, 0, 0);
        aircraft.add(leftWingTip);
        
        const rightWingTip = new THREE.Mesh(wingTipGeometry, wingTipMaterial);
        rightWingTip.position.set(6, 0, 0);
        aircraft.add(rightWingTip);
        
        // Add Shiva's Airways logo elements
        const logoGeometry = new THREE.RingGeometry(0.2, 0.4, 8);
        const logoMaterial = new THREE.MeshPhongMaterial({
            color: 0x1B4F72,               // Deep blue
            specular: 0x3498DB,            // Blue specular
            shininess: 80,
            side: THREE.DoubleSide
        });
        
        const logo1 = new THREE.Mesh(logoGeometry, logoMaterial);
        logo1.position.set(1, 0.5, 0.2);
        logo1.rotation.y = Math.PI / 2;
        aircraft.add(logo1);
        
        const logo2 = new THREE.Mesh(logoGeometry, logoMaterial);
        logo2.position.set(-1, 0.5, 0.2);
        logo2.rotation.y = -Math.PI / 2;
        aircraft.add(logo2);
    }

    // Setup loading manager
    var manager = new THREE.LoadingManager(onModelLoaded);
    manager.onProgress = (item, loaded, total) => console.log(item, loaded, total);

    // Load the 3D model
    var loader = new THREE.OBJLoader(manager);
    loader.load('https://assets.codepen.io/557388/1405+Plane_1.obj', function (obj) {
        object = obj;
    });
}

function setupAnimation(model) {
    let scene = new Scene(model);
    let plane = scene.modelGroup;

    // Initial entrance animations
    gsap.fromTo('canvas', { x: "50%", autoAlpha: 0 }, { 
        duration: 1.5, 
        x: "0%", 
        autoAlpha: 1, 
        ease: "power2.out" 
    });
    
    gsap.to('.loading', { autoAlpha: 0, duration: 0.5 });
    gsap.to('.scroll-cta', { opacity: 1, delay: 1 });
    gsap.set('svg', { autoAlpha: 1 });

    // Mathematical constant for full rotation
    let tau = Math.PI * 2;

    // Set initial plane position and rotation (adjusted for larger size)
    gsap.set(plane.rotation, { y: tau * -.25 });
    gsap.set(plane.position, { x: 120, y: -45, z: -80 });

    // Initial render
    scene.render();

    var sectionDuration = 1;

    // View transitions for blueprint section
    gsap.fromTo(scene.views[1],
        { height: 1, bottom: 0 },
        {
            height: 0, bottom: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: ".blueprint",
                scrub: true,
                start: "bottom bottom",
                end: "bottom top"
            }
        });

    gsap.fromTo(scene.views[1],
        { height: 0, bottom: 0 },
        {
            height: 1, bottom: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: ".blueprint",
                scrub: true,
                start: "top bottom",
                end: "top top"
            }
        });

    // Parallax effects for ground and clouds
    gsap.to('.ground', {
        y: "30%",
        scrollTrigger: {
            trigger: ".ground-container",
            scrub: true,
            start: "top bottom",
            end: "bottom top"
        }
    });

    gsap.from('.clouds', {
        y: "25%",
        scrollTrigger: {
            trigger: ".ground-container",
            scrub: true,
            start: "top bottom",
            end: "bottom top"
        }
    });

    // SVG line drawing animations
    gsap.to('#line-length', {
        drawSVG: 100,
        scrollTrigger: {
            trigger: ".length",
            scrub: true,
            start: "top bottom",
            end: "top top"
        }
    });

    gsap.to('#line-wingspan', {
        drawSVG: 100,
        scrollTrigger: {
            trigger: ".wingspan",
            scrub: true,
            start: "top 25%",
            end: "bottom 50%"
        }
    });

    gsap.to('#circle-phalange', {
        drawSVG: 100,
        scrollTrigger: {
            trigger: ".phalange",
            scrub: true,
            start: "top 50%",
            end: "bottom 100%"
        }
    });

    // SVG fade out animations
    gsap.to('#line-length', {
        opacity: 0,
        drawSVG: 0,
        scrollTrigger: {
            trigger: ".length",
            scrub: true,
            start: "top top",
            end: "bottom top"
        }
    });

    gsap.to('#line-wingspan', {
        opacity: 0,
        drawSVG: 0,
        scrollTrigger: {
            trigger: ".wingspan",
            scrub: true,
            start: "top top",
            end: "bottom top"
        }
    });

    gsap.to('#circle-phalange', {
        opacity: 0,
        drawSVG: 0,
        scrollTrigger: {
            trigger: ".phalange",
            scrub: true,
            start: "top top",
            end: "bottom top"
        }
    });

    // Main airplane animation timeline
    let tl = new gsap.timeline({
        onUpdate: scene.render,
        scrollTrigger: {
            trigger: ".content",
            scrub: true,
            start: "top top",
            end: "bottom bottom"
        },
        defaults: { duration: sectionDuration, ease: 'power2.inOut' }
    });

    let delay = 0;

    // Hide scroll indicator and start movement (adjusted for larger plane)
    tl.to('.scroll-cta', { duration: 0.25, opacity: 0 }, delay);
    tl.to(plane.position, { x: -15, ease: 'power1.in' }, delay);

    delay += sectionDuration;

    // First major rotation and movement (enhanced for larger plane)
    tl.to(plane.rotation, { x: tau * .25, y: 0, z: -tau * 0.05, ease: 'power1.inOut' }, delay);
    tl.to(plane.position, { x: -60, y: 0, z: -80, ease: 'power1.inOut' }, delay);

    delay += sectionDuration;

    // Bank to the right (enhanced movement)
    tl.to(plane.rotation, { x: tau * .25, y: 0, z: tau * 0.05, ease: 'power3.inOut' }, delay);
    tl.to(plane.position, { x: 60, y: 0, z: -80, ease: 'power2.inOut' }, delay);

    delay += sectionDuration;

    // Another banking maneuver (enhanced for dramatic effect)
    tl.to(plane.rotation, { x: tau * .2, y: 0, z: -tau * 0.1, ease: 'power3.inOut' }, delay);
    tl.to(plane.position, { x: -60, y: 0, z: -40, ease: 'power2.inOut' }, delay);

    delay += sectionDuration;

    // Straighten out and move forward (adjusted positioning)
    tl.to(plane.rotation, { x: 0, z: 0, y: tau * .25 }, delay);
    tl.to(plane.position, { x: 0, y: -15, z: 70 }, delay);

    delay += sectionDuration;
    delay += sectionDuration;

    // Begin final approach sequence (enhanced for larger plane)
    tl.to(plane.rotation, { x: tau * 0.25, y: tau * .5, z: 0, ease: 'power4.inOut' }, delay);
    tl.to(plane.position, { z: 40, ease: 'power4.inOut' }, delay);

    delay += sectionDuration;

    // Continue approach (adjusted for scale)
    tl.to(plane.rotation, { x: tau * 0.25, y: tau * .5, z: 0, ease: 'power4.inOut' }, delay);
    tl.to(plane.position, { z: 80, x: 45, ease: 'power4.inOut' }, delay);

    delay += sectionDuration;

    // Complex banking maneuver (enhanced for dramatic effect)
    tl.to(plane.rotation, { x: tau * 0.35, y: tau * .75, z: tau * 0.6, ease: 'power4.inOut' }, delay);
    tl.to(plane.position, { z: 130, x: 30, y: 0, ease: 'power4.inOut' }, delay);

    delay += sectionDuration;

    // Prepare for final approach (enhanced positioning)
    tl.to(plane.rotation, { x: tau * 0.15, y: tau * .85, z: -tau * 0, ease: 'power1.in' }, delay);
    tl.to(plane.position, { z: -200, x: 0, y: 0, ease: 'power1.inOut' }, delay);

    delay += sectionDuration;

    // Final flyaway sequence (enhanced for larger plane)
    tl.to(plane.rotation, { 
        duration: sectionDuration, 
        x: -tau * 0.05, 
        y: tau, 
        z: -tau * 0.1, 
        ease: 'none' 
    }, delay);
    
    tl.to(plane.position, { 
        duration: sectionDuration, 
        x: 0, 
        y: 45, 
        z: 450, 
        ease: 'power1.in' 
    }, delay);

    // Animate lighting for dramatic effect (enhanced)
    tl.to(scene.light.position, { 
        duration: sectionDuration, 
        x: 0, 
        y: 0, 
        z: 0 
    }, delay);
    
    tl.to(scene.keyLight, {
        duration: sectionDuration,
        intensity: 1.2,
        ease: 'power2.inOut'
    }, delay);
}

// Initialize the application
loadModel();