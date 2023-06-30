export const richTextToHTML = (richTextObj: Record<string, any>): string => {
  const processNode = (node: any) => {
    if (!node) return '';

    if (node.type === 'text') {
      let value = (node.value || '').replace(/\n/g, '<br>');
      if (node.bold) value = `<strong>${value}</strong>`;
      if (node.italic) value = `<em>${value}</em>`;
      return value;
    }

    if (node.type === 'link') {
      const target = node.target ? `target="${node.target}"` : '';
      const title = node.title ? `title="${node.title}"` : '';
      return `<a href="${node.url}" ${target} ${title}>${node.children.map(processNode).join('')}</a>`;
    }

    const childrenHTML = node.children.map(processNode).join('');

    switch (node.type) {
      case 'root':
        return childrenHTML;
      case 'heading':
        return `<h${node.level}>${childrenHTML}</h${node.level}>`;
      case 'paragraph':
        return `<p>${childrenHTML}</p>`;
      case 'list-item':
        return `<li>${childrenHTML}</li>`;
      case 'list':
        const listTag = node.listType === 'unordered' ? 'ul' : 'ol';
        return `<${listTag}>${childrenHTML}</${listTag}>`;
      default:
        return '';
    }
  };

  return processNode(richTextObj);
};
