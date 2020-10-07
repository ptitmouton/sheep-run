export const Input = {
    leftKey: false,
    rightKey: false,
    jumpKey: false,
    actionKey: false,
    init() {
        document.addEventListener('keydown', e => {
            if (e.code === 'Arrowup' || e.code === 'KeyW') {
                this.jumpKey = true;
            }
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') { 
                this.leftKey = true;
            }
            if (e.code === 'ArrowRight' || e.code === 'KeyD') { 
                this.rightKey = true;
            }
            if (e.code === 'Space') {
                this.actionKey = true;
            }
        });
        document.addEventListener('keyup', e => {
            this.leftKey = false;
            this.rightKey = false;
            this.jumpKey = false;
            this.actionkey = false;
        });
    }
};

Input.init();
