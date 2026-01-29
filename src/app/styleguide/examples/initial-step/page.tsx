"use client";

import React from "react";
import { Button } from "@/components/shadcn/button";
import { FileDropZone } from "@/components/igreen/FileDropZone";

export default function InitialStepPage() {
    return (
        <div className="min-h-screen bg-bg-surface flex flex-col items-center pt-8 pb-8 px-6">
            <div className="w-full max-w-[480px] flex flex-col gap-6">

                {/* Header */}
                <div className="flex flex-col items-start gap-6">
                    <div className="inline-flex items-center justify-center bg-bg-muted rounded-full h-[26px] px-3">
                        <span className="text-[11px] font-bold text-fg-main uppercase leading-[18px] tracking-[-0.16px]">
                            PASSO 1 DE 5
                        </span>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <h1 className="text-page-title text-fg-strong">
                            Comece enviando <span className="text-fg-success">sua conta de luz</span>
                        </h1>

                        <p className="text-page-subtitle text-fg-muted">
                            Com ela, analisamos seu perfil de consumo e agilizamos todo o processo
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col gap-2 w-full">
                    {/* Dropzone Area */}
                    <div className="w-full">
                        <FileDropZone
                            title="Solte aqui o arquivo da sua última conta"
                            description="Formatos aceitos: PDF, JPG ou PNG"
                            className="w-full"
                        />
                    </div>

                    {/* Alternative Action */}
                    <div className="flex justify-center">
                        <Button variant="link">
                            Não tenho a fatura para enviar neste momento
                        </Button>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="flex flex-col gap-2 w-full mt-2">
                    <h3 className="text-label text-fg-main">
                        DICAS PARA UM ENVIO SEM ERROS
                    </h3>

                    <div className="bg-bg-muted border border-border rounded-[18px] p-3 flex flex-col gap-2 w-full">
                        <TipItem text="Certifique-se que os dados da conta estão legíveis" />
                        <TipItem text="O arquivo deve conter a conta completa (frente e verse se houver)" />
                        <TipItem text="O arquivo Fotos devem ser tiradas em local de boa iluminação" />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto w-full pt-8">
                    <Button variant="default" color="secondary" size="lg" className="w-full text-button-md font-bold">
                        Voltar
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Helper Component for Tips
function TipItem({ text }: { text: string }) {
    return (
        <div className="bg-bg-surface px-3.5 py-2.5 rounded-[var(--radius-base)] shadows-boxshadow-sm flex items-center w-full">
            <span className="text-body-xs-semibold text-fg-main tracking-[0.055px]">
                {text}
            </span>
        </div>
    );
}
