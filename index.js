 var config = {
        type: Phaser.AUTO,
        width: 1200,
        height: 800,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 700 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        canvas: document.getElementById("mang")
    };

    var player;
    var platforms;
    var win;
    var cursors;
    var addplat;
    var game = new Phaser.Game(config);

    function preload ()
    {
        this.load.image('sky', 'Assets/sky.png');
        this.load.image('ground', 'Assets/platform.png');
        this.load.image('tegelane', 'Assets/tegelane.png');
        this.load.image('bluestar', 'Assets/bluestar.png');
        this.load.image('win', 'Assets/greenstar.png');
    }

    function create ()
    {
        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 800, 'ground').setScale(4).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(400, 100, 'ground');

        win = this.physics.add.staticGroup();
        win.create(400, 60, 'win');

        player = this.physics.add.sprite(100, 450, 'tegelane');

        player.setCollideWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(player, platforms);
 
        addplat = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.physics.add.overlap(player, win, winGame, null, this);
    }

    function winGame(player, win){
    	win.disableBody(true, true);
    	document.getElementById("level2").style.display = "block";
    }

    function update ()
    {
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

        }
        else
        {
            player.setVelocityX(0);

        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-400);
        }
        if (Phaser.Input.Keyboard.JustDown(addplat)){
            // this.add.sprite(player.x + 50,player.y + 50, 'ground');
            console.log(player.x);
    		console.log(player.y);
            platforms.create(player.x, player.y + 50, 'bluestar');
            player.x = 100;
            player.y = 500;
        }
        if(win.touching){
        	console.log("over");
        }
    }
    