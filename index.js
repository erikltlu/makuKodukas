 var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var player;
    var platforms;
    var cursors;
    var addplat;
    var game = new Phaser.Game(config);

    function preload ()
    {
        this.load.image('sky', 'Assets/sky.png');
        this.load.image('ground', 'Assets/platform.png');
        this.load.image('dude', 'Assets/dude.png');
        this.load.image('icon', 'Assets/icon.png');
    }

    function create ()
    {
        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(400, 100, 'ground');

        player = this.physics.add.sprite(100, 450, 'rectangle');

        player.setCollideWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(player, platforms);
 
        addplat = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);


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
            player.setVelocityY(-270);
        }
        if (Phaser.Input.Keyboard.JustDown(addplat)){
            // this.add.sprite(player.x + 50,player.y + 50, 'ground');
            console.log(player.x);
    		console.log(player.y);
            platforms.create(player.x, player.y + 50, 'icon');
            player.x = 100;
            player.y = 450;
        }
    }
    