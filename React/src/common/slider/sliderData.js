import img1 from "../../assets/1.jfif";
import img2 from "../../assets/2.jfif";
import img3 from "../../assets/3.jfif";

const getSlides = (t) => [
    {
        id: 1,

        badge: t("slides.featured.badge"),

        title: t("slides.featured.title"),

        subtitle: t("slides.featured.subtitle"),

        description: t("slides.featured.description"),

        image: img1,
    },

    {
        id: 2,

        badge: t("slides.quantum.badge"),

        title: t("slides.quantum.title"),

        subtitle: t("slides.quantum.subtitle"),

        description: t("slides.quantum.description"),

        image: img2,
    },

    {
        id: 3,

        badge: t("slides.cybersecurity.badge"),

        title: t("slides.cybersecurity.title"),

        subtitle: t("slides.cybersecurity.subtitle"),

        description: t("slides.cybersecurity.description"),

        image: img3,
    },
];

export default getSlides;