import path from "path"
import fs from "fs"

export const deleteImage = (imageName: string) => {
    const fullPath = path.join(__dirname, "../../public/static", imageName);

console.log("Apagado: " + fullPath)
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error("Erro ao apagar a imagem:", err.message);
            return { success: false, message: "Erro ao apagar a imagem." };
        }
        return { success: true, message: "Imagem apagada com sucesso." };
    });
}