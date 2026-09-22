import JSZip from 'jszip';

export interface ExtractedFile {
  path: string;
  name: string;
  extension: string;
  size: number;
  lastModified?: string;
  content?: string;
}

export async function processZipFile(file: File): Promise<ExtractedFile[]> {
  const zip = new JSZip();
  const zipContent = await zip.loadAsync(file);
  const extractedFiles: ExtractedFile[] = [];

  for (const [relativePath, zipEntry] of Object.entries(zipContent.files)) {
    if (zipEntry.dir) continue;

    const extension = relativePath.split('.').pop()?.toLowerCase() || '';
    const name = relativePath.split('/').pop() || relativePath;
    const dateStr = zipEntry.date ? zipEntry.date.toISOString() : undefined;

    let content: string | undefined = undefined;
    // Read text content for code/config/doc files up to 2MB
    if (
      ['json', 'txt', 'md', 'js', 'ts', 'jsx', 'tsx', 'py', 'html', 'css', 'sql', 'csv', 'yml', 'yaml', 'xml', 'toml', 'env'].includes(extension)
    ) {
      try {
        content = await zipEntry.async('text');
      } catch (err) {
        console.warn(`Could not read text for ${relativePath}`, err);
      }
    }

    extractedFiles.push({
      path: relativePath,
      name,
      extension,
      size: (zipEntry as any)._data?.uncompressedSize || 0,
      lastModified: dateStr,
      content,
    });
  }

  return extractedFiles;
}

export async function processFileList(files: FileList | File[]): Promise<ExtractedFile[]> {
  const extractedFiles: ExtractedFile[] = [];

  for (const file of Array.from(files)) {
    const relativePath = (file as any).webkitRelativePath || file.name;
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const dateStr = new Date(file.lastModified).toISOString();

    let content: string | undefined = undefined;
    if (
      ['json', 'txt', 'md', 'js', 'ts', 'jsx', 'tsx', 'py', 'html', 'css', 'sql', 'csv', 'yml', 'yaml', 'xml', 'toml', 'env'].includes(extension) &&
      file.size < 2 * 1024 * 1024
    ) {
      try {
        content = await file.text();
      } catch (err) {
        console.warn(`Could not read text for ${relativePath}`, err);
      }
    }

    extractedFiles.push({
      path: relativePath,
      name: file.name,
      extension,
      size: file.size,
      lastModified: dateStr,
      content,
    });
  }

  return extractedFiles;
}
