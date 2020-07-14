declare var $: any;

export class ShareBaseComponent {
  constructor() {
  }

  applyTippy() {
    setTimeout(() => {
      $('[data-tippy-placement]', {
        delay: 100,
        arrow: true,
        arrowType: 'sharp',
        size: 'regular',
        duration: 200,

        // 'shift-toward', 'fade', 'scale', 'perspective'
        animation: 'shift-away',

        animateFill: true,
        theme: 'dark',

        // How far the tooltip is from its reference element in pixels
        distance: 10,

      });
    }, 500);

  }
}
