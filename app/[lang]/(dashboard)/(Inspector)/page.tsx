import { getDictionary } from "@/app/dictionaries";
import InspectorPageView from "@/app/[lang]/(dashboard)/(Inspector)/page-view";

interface InspectorProps {
    params: {
        lang: any;
    };
}
const Inspector = async ({ params: { lang } }: InspectorProps) => {
    const trans = await getDictionary(lang);
    return <InspectorPageView trans={trans} />;
};

export default Inspector;
