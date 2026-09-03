import { sections, socialMedia, terms } from "@/lab/constants/footerLinks.js"


function Footer() {
    return (

        <footer className="">
            <hr className="m-0" />
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr] pt-10 justify-center justify-items-center">
                {sections.map((content) => (
                    <div className="" key={content.section}>
                        <h3 className="font-bold text-xl mb-3 ">{content.section}</h3>
                        <ul className="">
                            {content.links.map((item) => (
                                <li className="hover:scale-105 hover:text-gray-400 transition-colors" key={item.name}><a href={item.url}>{item.name}</a></li>
                            ))}
                        </ul>
                    </div>
                ))}
                <div className=" flex flex-col items-center gap-3">
                    <h3 className="font-bold text-xl">Follow Us</h3>
                    {socialMedia.map((img) => (
                        <a key={img.alt} className="" href={img.url}><img className="h-10" src={img.imgSrc} alt={img.alt} /></a>
                    ))}
                </div>

            </div>

            <div className="flex justify-center justify-items-center items-center gap-6 mt-20">
                <p><strong>&copy;{new Date().getFullYear()} Fluent, Inc.</strong></p>
                {terms.map((content) => (
                    <a className="hover:text-gray-400 transition-colors" key={content.name} href={content.url}>{content.name}</a>
                ))}
            </div>
            <hr className="pb-14 w-2/5 mx-auto" />
        </footer>
    );
}
export default Footer;