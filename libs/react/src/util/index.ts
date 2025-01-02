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

  const animation = config.theme.extend.animation;

  animation.ri_SidebarMenuSlideDown = 'ri_slideDown 300ms ease-out';
  animation.ri_SlidebarMenuSlideUp = 'ri_slideUp 300ms ease-out';

  return config;
}

export {
  overrideTailwindConfig
}
