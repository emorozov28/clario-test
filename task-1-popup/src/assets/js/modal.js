export default class Modal {
    constructor(options) {
        this.defaultOptions = {
            animation: 'show',
            position: 'center',
            width: '600px',
            height: null,
            speed: 250
        }

        const changeOptions = {
            isOpen: () => { },
            isClose: () => { },
            animation: this.defaultOptions.animation,
            position: this.defaultOptions.position,
            width: this.defaultOptions.width,
            height: this.defaultOptions.height,
            speed: this.defaultOptions.speed
        }

        this.options = { ...changeOptions, ...options };
        this.modal = document.querySelector('#modal');
        this.modalItem = null;
        this.nextModalItem = null;
        this.isOpenModal = false,
        this.isCloseModal = false,
        this.animation = null;
        this._modalAnimationNames = ['fadeIn', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight'];
        this._modalPositionNames = ['top', 'top-left', 'top-right', 'center', 'center-left', 'center-right', 'bottom', 'bottom-left', 'bottom-right'];
        this.position = null;
        this.width = null;
        this.height = null
        this.speed = this.defaultOptions.speed;
        this.selectedModal = null;
        this.selectedBtn = null;
        this.fixedBlock = document.querySelectorAll('.fixed-block');

        this.init();
    }

    init() {
        const that = this;

        if (!that.modal) throw new Error('Wrapper for modal window not found');

        document.addEventListener('click', event => {
            const clickedElement = event.target.closest('[data-modal-path]');
            const clickedCloseElement = event.target.closest('.modal-close');
            const clickedUninstallElement = event.target.closest('.modal-uninstall-close');

            if (clickedElement) {
                that.selectedBtn = clickedElement;
                const path = clickedElement.dataset.modalPath;
                const $modalItem = that.modal.querySelector(`[data-modal-target="${path}"]`);

                if (!$modalItem) throw new Error('Modal window not found');

                that.modalItem = $modalItem;

                that.showModal();
                return;
            }

            if (!event.target.closest('.modal__item') && that.isOpenModal) {
                that.closeModal();
                that.isOpenModal = false;
                return;
            }

            if (clickedCloseElement) {
                that.closeModal();
                that.isOpenModal = false;
                return;
            }

            if (clickedUninstallElement) {
                that.closeModal();
                that.isOpenModal = false;
                setTimeout(() => {
                    alert('DONE');
                }, this.speed);
                return;
            }
        });

        document.addEventListener('keydown', event => {
            event.key === 'Escape' && that.isOpenModal ? that.closeModal() : null
        });

    }

    showModal(selector) {
        this.options.speed ? this.speed = this.options.speed : this.speed = this.defaultOptions.speed;
        getComputedStyle(this.modal).getPropertyValue('--transition-time', this.speed);
        this.modal.style.setProperty('--transition-time', this.speed + 'ms');


        const { isOpen } = this.options;
        const that = this;

        const showModalFn = () => {
            that.modalItem.classList.add(that.defaultOptions.animation);
            that.modalItem.classList.add(that.animation);
            setTimeout(() => {
                that.modalItem.classList.add('animation-show');
                isOpen(that);
                that.isOpenModal = true;
            }, that.speed);
        }

        if (this.isOpenModal) {
            const modalItems = this.modal.querySelectorAll('[data-modal-target]');
            for (let i = 0; i < modalItems.length; i++) {
                
                if (modalItems[i].classList.contains(this.defaultOptions.animation)) {
                    const [a, b] = [modalItems[i].getAttribute('data-modal-target'), document.activeElement.getAttribute('data-modal-path')];
                    if (a === b) return alert('This modal window is open') 

                    this.disableScrollElem();
                    modalItems[i].classList.remove('animation-show');
                    modalItems[i].classList.remove(this.position);
                    setTimeout(() => {
                        modalItems[i].classList.remove(this.defaultOptions.animation);
                    }, this.speed);
                }
            }
        }

        that.modal.classList.add(that.defaultOptions.animation);
        if (selector) {
            this.modalItem = this.modal.querySelector(`[data-modal-target="${selector}"]`)
            showModalFn();
        }

        this.modalAnimation();
        this.modalPosition();
        this.disableScrollElem();
        this.modalSize('height');
        this.modalSize('width');
        showModalFn();

    }

    closeModal() {

        if (this.modalItem && this.modalItem.classList.contains('animation-show')) {
            this.modalItem.classList.remove('animation-show');
        }

        setTimeout(() => {
            this.modalItem.classList.remove(this.defaultOptions.animation);
            this.modalItem.classList.remove(this.animation);
            this.modalItem.classList.remove(this.position);
            this.modal.classList.remove(this.defaultOptions.animation)
            this.enableScroll();
            this.options.isClose(this);
        }, this.speed);

    }

    modalSize(param) {
        const elem = this.options[param];
        let dataSize;

        switch (param) {
            case 'width':
                dataSize = this.selectedBtn?.dataset.modalWidth;
                break;
            case 'height':
                dataSize = this.selectedBtn?.dataset.modalHeight;
                break;
        }

        const reg = /([0-9]+)(px|\%|vh|rem|em|pt|cm|mm|pc|in)?/gi;

        elem ? this[elem] = elem.match(reg)[0] : this[elem] = this.defaultOptions[elem];
        dataSize ? this[elem] = dataSize.match(reg)[0] : this[elem];

        this.modalItem.style[param] = this[elem];
    }

    modalPosition() {
        const { position } = this.options;
        const dataPosition = this.selectedBtn?.dataset.modalPosition;

        position ? this.position = position : this.position = this.defaultOptions.position;
        dataPosition ? this.position = dataPosition : this.defaultOptions.position;

        switch (this.position) {
            case 'center':
                this.position = 'position-center';
                break;
            case 'center-left':
                this.position = 'position-center-left';
                break;
            case 'center-right':
                this.position = 'position-center-right';
                break;
            case 'top':
                this.position = 'position-top';
                break;
            case 'top-left':
                this.position = 'position-top-left';
                break;
            case 'top-right':
                this.position = 'position-top-right';
                break;
            case 'bottom':
                this.position = 'position-bottom';
                break;
            case 'bottom-left':
                this.position = 'position-bottom-left';
                break;
            case 'bottom-right':
                this.position = 'position-bottom-right';
                break;
            default:
                this.position = 'position-center';
                break;

        }

        this.modalItem.classList.add(this.position);
    }

    modalAnimation() {
        const { animation } = this.options;
        const animationShow = this._modalAnimationNames[Math.floor(Math.random() * this._modalAnimationNames.length)];
        const dataAnimationName = this.selectedBtn?.dataset.modalAnimation;

        this.animation = dataAnimationName;

        if (animation === 'random') {
            if (dataAnimationName) {
                this.animation = dataAnimationName;
                return;
            }
            this.animation = animationShow
        } else if (dataAnimationName === 'random') {
            this.animation = animationShow
        } else {
            animation ? this.animation = animation : this.animation = this.defaultOptions.animation;
            dataAnimationName ? this.animation = dataAnimationName : this.animation = this.defaultOptions.animation;
        }
    }

    disableScrollElem() {
        const pagePosition = window.scrollY;
        this.lockPadding();
        document.body.classList.add('disable--scroll');
        document.body.dataset.windowPosition = pagePosition;
        document.body.style.top = `-${pagePosition}px`;
    }

    enableScroll() {
        const pagePosition = document.body.dataset.windowPosition;
        this.unlockPadding();
        document.body.classList.remove('disable--scroll');
        document.body.style.top = 'auto';
        window.scroll({
            top: pagePosition,
            left: 0
        });
    }

    lockPadding() {
        let paddingOffset = window.innerWidth - document.body.offsetWidth;
        document.body.style.boxSizing = 'border-box';
        document.body.style.paddingRight = `${paddingOffset}px`;
        this.fixedBlock.forEach(block => {
            block.style.paddingRight = `${paddingOffset}px`;
        });
        document.body.style.paddingRight = `${paddingOffset}px`;
    }

    unlockPadding() {
        document.body.removeAttribute('data-window-position');
        this.fixedBlock.forEach(block => {
            block.style.paddingRight = '0px';
        });
        document.body.style.paddingRight = '0px';
    }
}