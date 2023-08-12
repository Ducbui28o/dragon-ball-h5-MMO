import resposiveRuongView from "./responsiveRuongView.js";

export default class preViewItemShopBoxRuong extends resposiveRuongView {
    constructor() {
        super();
    }

    previewItemBoxRuong(data,item) 
    {
        if(this.dangmoruong == true) 
        {
            return false;
        }
        let heightKhung = 0;
        let itemPos = data.getBounds();

        
        // clear preview item
        this.boxPreviewItem.removeChildren();

        this.boxPreviewItem.visible = true;


        let boxBackground = new PIXI.Graphics();
        this.boxPreviewItem.addChild(boxBackground);

        let width = this.gameWidth * 0.4;
        let wMin = 350;
        if(width < wMin) width = wMin;
        if(width > this.gameWidth) width = this.gameWidth * 1;

        let height = this.gameHeight * 0.15;
        let hMin = 85;
        if(height < hMin) height = hMin;


        boxBackground.mwidth = width;
        boxBackground.mheight = height;




        boxBackground.beginFill(0xfefefe, 1);
        boxBackground.drawRoundedRect(0, 0, boxBackground.mwidth, boxBackground.mheight, 5);
        boxBackground.endFill();

        boxBackground.x = 10;


        /* Điền dữ liệu ở đây */

        let avatar = this.snowlyImg(item.avatar);
        avatar.width = 30;
        avatar.height = 30;
        avatar.x =  10;
        avatar.y = boxBackground.mheight * 0.1;
        boxBackground.addChild(avatar);

        heightKhung += avatar.height;


        let name = new PIXI.HTMLText(item.name, {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0x532905,
            fontWrap: true,
            align: 'right',
            WrapWidth: boxBackground.mwidth - avatar.width - 20,
            WrapHeight: boxBackground.mheight
        });
        name.style.fontWeight = 'bold';
        name.x = boxBackground.width - name.width - 10;
        name.y = avatar.y + avatar.height / 2 - name.height / 2;
        boxBackground.addChild(name);
        heightKhung += name.height;

        let Yold = name.y + name.height;

        if(item.type == 'trangbi') {
            let chiso = item.info;


            for(let t in chiso) {
                if(chiso[t] == 0) continue;
                let txt = "";
                if(this.itemTypeName[t].type == '%') {
                    txt = "" + (chiso[t] > 0 ? '+' : '-') + "" + chiso[t] + this.itemTypeName[t].name;
                } else {
                    txt = this.itemTypeName[t].name + "" + (chiso[t] > 0 ? '+' : '-') + "" + chiso[t];
                }
                


                let name = new PIXI.HTMLText(txt, {
                    fontFamily: 'Arial',
                    fontSize: 16,
                    fill: 0x00cb00,
                    fontWrap: true,
                    align: 'right',
                    WrapWidth: boxBackground.mwidth - avatar.width - 20,
                    WrapHeight: boxBackground.mheight
                });
                name.style.fontWeight = 'bold';
                name.x = boxBackground.width - name.width - 10;
                name.y = Yold;
                boxBackground.addChild(name);
                heightKhung += name.height;
                Yold = name.y + name.height;

            }
        }

        let div = new PIXI.Graphics();
        div.beginFill(0x000000, 0.5);
        div.drawRect(0, 0, boxBackground.mwidth * 0.8, 1);
        div.endFill();
        div.y =  Yold + 15;
        div.x = boxBackground.mwidth/2 - div.width/2;
        boxBackground.addChild(div);
        heightKhung += div.height + 30;


        let dateJoin = new PIXI.Text(item.motadai, {
            fontFamily: 'Arial',
            fontSize: 14,
            fill: 0x000000,
            fontWrap: true,
            WrapWidth: div.width * 0.8,

        });
        dateJoin.style.fontWeight = 'bold';
        dateJoin.resolution = 2;
        dateJoin.style.fontWrap = true;
        dateJoin.style.wordWrap = true;
        dateJoin.style.wordWrapWidth = div.width * 0.8;
        dateJoin.style.wordWrapHeight = div.height * 0.8;



        dateJoin.x =  div.x + div.width/2 - dateJoin.width/2;
        dateJoin.y = div.y + div.height + 10;
        boxBackground.addChild(dateJoin);
        heightKhung += dateJoin.height;




        


        /* Kết thúc */

    

        boxBackground.mwidth = boxBackground.mwidth < width ? width : boxBackground.mwidth;
        heightKhung = heightKhung < height ? height : heightKhung;
        boxBackground.clear();
        boxBackground.lineStyle(1, 0x000000, 1);
        boxBackground.beginFill(0xffffff, 1);
        boxBackground.drawRoundedRect(0, 0, boxBackground.mwidth, heightKhung, 10);
        boxBackground.endFill();


        // create button use item height = 30% of boxBackground, width = 30% of boxBackground use Graphics

        let useContainer = new PIXI.Container();
        this.boxPreviewItem.addChild(useContainer);

        let useButton = new PIXI.Graphics();
        useButton.name = "since04";
        useButton.lineStyle(1, 0x000000, 1);
        useButton.beginFill(0xd68f32, 1);
        useButton.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
        useButton.endFill();
        useButton.interactive = true;
        useButton.buttonMode = true;
        let self = this;
        useButton.on('pointerdown', () => {

        });
        // move mouse to useButton change background
        useButton.on('pointerover', () => {
            useButton.clear();
            useButton.lineStyle(1, 0x000000, 1);
            useButton.beginFill(0x49be62, 1);
            useButton.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
            useButton.endFill();
        });
        // move mouse out of useButton change background
        useButton.on('pointerout', () => {
            useButton.clear();
            useButton.lineStyle(1, 0x000000, 1);
            useButton.beginFill(0xd68f32, 1);
            useButton.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
            useButton.endFill();
        });


        let useText = new PIXI.Text('Đóng', {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0x532905,
            fontWrap: true,
            align: 'center',
            WrapWidth: useButton.getBounds().width,
            WrapHeight: useButton.getBounds().height
        });
        useText.style.fontWeight = 'bold';
        useText.style.fontSize = itemPos.height * 0.25;
        useText.resolution = 2;
        useText.x = (useButton.getBounds().width - useText.getBounds().width) / 2;
        useText.y = (useButton.getBounds().height - useText.getBounds().height) / 2;
        useButton.addChild(useText);

        // create button close like use button

     

        useContainer.addChild(useButton);




        boxBackground.y = itemPos.y - boxBackground.getBounds().height + itemPos.height;

        if(boxBackground.y + boxBackground.getBounds().height + useContainer.getBounds().height > this.gameHeight) {
            boxBackground.y = this.gameHeight - boxBackground.getBounds().height - 10 - useContainer.getBounds().height;
        }

        if(boxBackground.y < 0) {
            boxBackground.y = 10;
        }


        useContainer.x = (boxBackground.getBounds().width - useContainer.getBounds().width) / 2;
        useContainer.y = boxBackground.getBounds().height + boxBackground.getBounds().y;


        let point = 0;
        if(this.pcKey == 'Enter') this.pcKey = '1';

        let banphimPc = setInterval(() => {
            if(this.boxPreviewItem.children.length <= 0) {
                clearInterval(banphimPc);
                return false;
            }

            let children = useContainer.children.filter(e => e.name == 'since04');
            let event = this.pcKey;

            if(event === 'ArrowLeft') {
                point -= 1;
                if(point < 0) point = children.length - 1;

            } else if(event === 'ArrowRight') {
                point += 1;
                if(point >= children.length) point = 0;
            }

            if(event === 'ArrowUp') {
                self.boxPreviewItem.removeChildren();

            } else if(event === 'ArrowDown') {
                self.boxPreviewItem.removeChildren();

            }

            if(event === 'Enter') {
                let current = children[point];
                let event = self.getAllInteractiveChildren(current);
                if(event.length > 0) {
                    event[0].emit('pointerdown');
                    event[0].emit('pointerup');
                    this.boxPreviewItem.removeChildren();
                }
            }

            if(children[point] && self.pcKey.length >= 1) {
                for(let i = 0; i < children.length; i++) {
                    children[i].removeChild(children[i].getChildByName('xanhle'));
                }

                let width = children[point].width;
                let height = children[point].height;
                let background = new PIXI.Graphics();
                background.lineStyle(0, 0x000000, 1);
                background.beginFill(0xf8fe4a, 0.5);
                background.drawRoundedRect(0, 0, width, height, 0);
                background.endFill();
                background.name = "xanhle";
                children[point].addChild(background);

                let current = children[point];
                let eventclick = self.getAllInteractiveChildren(current);

                if(eventclick.length > 0) {
                    background.interactive = true;
                    background.cursor = 'pointer';
                    // coppy interacive from children[point]
                    background.on('pointerdown', () => {
                        eventclick[0].emit('pointerdown');
                        this.boxPreviewItem.removeChildren();

                    });
                    background.on('pointerup', () => {
                        eventclick[0].emit('pointerup');
                        this.boxPreviewItem.removeChildren();
                    });

                }
            }


            this.pcKey = '';
        }, this.app.ticker.deltaMS);
    }
}