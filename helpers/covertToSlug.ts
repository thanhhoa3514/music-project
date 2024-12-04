import unidecode from 'unidecode';
export const  convertToSlug = (text: string): string =>{

    const uniCodeText=unidecode(text.trim());
    // Remove non-alphanumeric characters and replace with hyphens
    const slug= uniCodeText.replace(/\s+/g,"-");
    // Remove hyphens at the beginning and end of the string

    // Remove leading and trailing hyphens
    return slug.toLowerCase();
}