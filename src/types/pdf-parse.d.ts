declare module "pdf-parse/lib/pdf-parse" {
  interface PDFData {
    text: string;
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: Record<string, unknown> | null;
    version: string;
  }

  function pdf(dataBuffer: Buffer): Promise<PDFData>;

  export default pdf;
}