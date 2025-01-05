function ensurePath(config: any, path: string) {
  let ps = path.split('.');

  let current = config;

  ps.forEach(p => {
    if(current[p] == null) {
      current[p] = {}
    }

    current = current[p];
  })
}

function overrideTailwindConfig(config: any) {
  const animPath = 'theme.extend.animation';
  const keyframesPath = 'theme.extend.keyframes';

  ensurePath(config, animPath);
  ensurePath(config, keyframesPath);

  const keyframes = config.theme.extend.keyframes;

  keyframes.ri_slideDown = {
    from: { height: '0' },
    to: { height: 'var(--radix-accordion-content-height)' },
  }

  keyframes.ri_slideUp = {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0' },
  };

  keyframes.ri_overlayShow = {
    from: { opacity: "0" },
    to: { opacity: "1" },
  };

  keyframes.ri_contentShow = {
    from: {
      opacity: "0",
      transform: "translate(-50%, -48%) scale(0.96)",
    },
    to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
  };

  const animation = config.theme.extend.animation;

  animation.ri_SidebarMenuSlideDown = 'ri_slideDown 300ms ease-out';
  animation.ri_SlidebarMenuSlideUp = 'ri_slideUp 300ms ease-out';
  animation.ri_OverlayShow = "ri_overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)";
  animation.ri_ContentShow = "ri_contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)";

  return config;
}

export {
  overrideTailwindConfig
}
