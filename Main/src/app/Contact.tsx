import Section from "./Section";


function ContactInfo() {
    let Element: any =
        Section("Contact Information",
            ["*Email*: connor.macdonald.791@accesscreative.ac.uk",
                "\n",
                "\n",
                "*Github*: https://github.com/OCSYT",
            ],
            "text-green-500",
            "bg-black backdrop-blur bg-opacity-50 p-10 text-center"
        )
    return Element;
}

export default ContactInfo;