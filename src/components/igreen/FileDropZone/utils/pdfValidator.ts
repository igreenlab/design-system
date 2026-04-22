/**
 * Utilitario para validacao de PDF
 * 
 * Usa pdf.js para detectar se um PDF tem senha e validar senhas.
 * Requer que pdf.js esteja carregado via CDN ou script.
 */

// Tipos para pdf.js
declare global {
    interface Window {
        pdfjsLib?: {
            getDocument: (params: { url: string; password?: string }) => {
                promise: Promise<unknown>;
            };
        };
    }
}

export interface PdfValidationResult {
    /** Se o PDF precisa de senha */
    isPasswordProtected: boolean;
    /** Se a senha fornecida esta correta */
    isPasswordCorrect?: boolean;
    /** Mensagem de erro, se houver */
    error?: string;
}

/**
 * Verifica se pdf.js esta carregado
 */
export function isPdfJsLoaded(): boolean {
    return typeof window !== "undefined" && !!window.pdfjsLib;
}

/**
 * Carrega pdf.js via CDN dinamicamente
 */
export async function loadPdfJs(): Promise<void> {
    if (isPdfJsLoaded()) return;

    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Falha ao carregar pdf.js"));
        document.head.appendChild(script);
    });
}

/**
 * Valida um arquivo PDF
 * 
 * @param file - Arquivo PDF para validar
 * @param password - Senha opcional para tentar desbloquear
 * @returns Resultado da validacao
 */
export async function validatePdf(
    file: File,
    password?: string
): Promise<PdfValidationResult> {
    // Verifica se e PDF
    if (!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) {
        return {
            isPasswordProtected: false,
            error: "Arquivo nao e um PDF"
        };
    }

    // Carrega pdf.js se necessario
    if (!isPdfJsLoaded()) {
        try {
            await loadPdfJs();
        } catch {
            return {
                isPasswordProtected: false,
                error: "Nao foi possivel carregar o validador de PDF"
            };
        }
    }

    const fileUrl = URL.createObjectURL(file);

    try {
        const pdfjs = window.pdfjsLib!;

        const loadingTask = pdfjs.getDocument({
            url: fileUrl,
            password: password || ""
        });

        await loadingTask.promise;

        URL.revokeObjectURL(fileUrl);

        // PDF abriu com sucesso
        if (password) {
            return {
                isPasswordProtected: true,
                isPasswordCorrect: true
            };
        }

        return {
            isPasswordProtected: false
        };

    } catch (error: unknown) {
        URL.revokeObjectURL(fileUrl);

        const pdfError = error as { name?: string };

        if (pdfError.name === "PasswordException") {
            // PDF tem senha
            if (password) {
                // Senha fornecida esta errada
                return {
                    isPasswordProtected: true,
                    isPasswordCorrect: false
                };
            }

            return {
                isPasswordProtected: true
            };
        }

        // Outro erro (PDF assinado digitalmente, estrutura incomum, etc.)
        // Aceitar como valido — o backend/extractor processa via PyMuPDF
        console.warn("[pdfValidator] pdfjs falhou ao abrir PDF, aceitando como valido:", pdfError);
        return {
            isPasswordProtected: false
        };
    }
}
