import * as Phaser from "phaser";

import Character from "../classes/Character";
import Scroll from "../classes/Scroll";

export default class MapScene extends Phaser.Scene {
  character;
  scrolls;

  cursors;

  constructor() {
    super({ key: "MapScene" });
  }

  preload() {}

  create() {
    this.initMap();

    this.initCamera();

    this.initInput();
  }

  update() {
    // this.character.update();
    // this.scrolls.update();
    // var pointer = this.input.activePointer;
    // if (pointer.isDown) {
    //   this.character.moveTo(pointer.worldX, pointer.worldY);
    // }
    if (this.cursors.left.isDown) {
      this.cameras.main.scrollX--;
    }
    if (this.cursors.right.isDown) {
      this.cameras.main.scrollX++;
    }
    if (this.cursors.up.isDown) {
      this.cameras.main.scrollY--;
    }
    if (this.cursors.down.isDown) {
      this.cameras.main.scrollY++;
    }
  }

  initMap() {
    const map = this.make.tilemap({ key: "map-main" });

    const tileFloor = map.addTilesetImage("TilesetFloor", "TilesetFloor");
    const tileHouse = map.addTilesetImage("TilesetHouse", "TilesetHouse");
    map.createLayer("ground", tileFloor);
    map.createLayer("bottom", tileHouse);

    this.scrolls = this.add.group();
    map.getObjectLayer("scrolls").objects.forEach((scroll) => {
      const { x, y, name } = scroll;
      this.scrolls.add(new Scroll(this, x, y));
      console.log(name, x, y);
    });

    map.getObjectLayer("player").objects.forEach((scroll) => {
      const { x, y, name } = scroll;
      this.character = new Character("blue-ninja", this, x, y);
      console.log(name, x, y);
    });
  }

  initCamera() {
    // this.cameras.main.setBounds(0, 0, width, height);
    // const { width, height } = this.game.scale;
    // // const { x, y } = this.character;
    // this.cameras.main.setSize(width, height);
    this.cameras.main.setZoom(3);
    // // this.cameras.main.centerOn(x, y);
    // this.cameras.main.startFollow(this.character, true, 0.09, 0.09);
    // console.log(width);
    // console.log(height);
    const { x, y } = this.character;
    this.cameras.main.centerOn(x, y);
  }

  initInput() {
    // this.input.mouse.disableContextMenu();
    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
  }
}