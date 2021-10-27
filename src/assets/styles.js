const size = {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "480px",
    mobileXl: "576px",
    tablet: "768px",
    tabletM: "850px",
    laptop: "1024px",
    laptopM: "1200px",
    desktop: "2560px"
};

export const device = {
    mobileS: `@media (max-width: ${size.mobileS})`,
    mobileM: `@media (max-width: ${size.mobileM})`,
    mobileL: `@media (max-width: ${size.mobileL})`,
    mobileXl: `@media (max-width: ${size.mobileXl})`,
    tablet: `@media (max-width: ${size.tablet})`,
    tabletM: `@media (max-width: ${size.tabletM})`,
    tabletMHeight: `@media (max-height: 400px)`,
    laptop: `@media (max-width: ${size.laptop})`,
    laptopM: `@media (max-width: ${size.laptopM})`,
    desktop: `@media (max-width: ${size.desktop})`,
};
