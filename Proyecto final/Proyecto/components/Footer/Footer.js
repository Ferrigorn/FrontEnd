import "./Footer.css"

const template = () => `
<h3>Larry Games</h3>
`;

export const PrintTemplateFooter = () => {
    document.querySelector("Footer").innerHTML = template()
};