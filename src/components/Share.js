import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

import '../styles/Share.css';

const ShareButton = ({ type, url, text }) => {
  const handleClick = () => {
    switch (type) {
      case 'facebook':
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank');
        break;
      case 'whatsapp':
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
        window.open(whatsappUrl, '_blank');
        break;
      case 'twitter':
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        window.open(twitterUrl, '_blank');
        break;
      case 'linkedin':
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedinUrl, '_blank');
        break;
      case 'reddit':
        const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
        window.open(redditUrl, '_blank');
        break;
      case 'copy':
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        alert('Link copiado para a área de transferência');
        break;
      default:
        break;
    }
  };

  const getIconName = () => {
    switch (type) {
      case 'facebook':
        return 'facebook';
      case 'whatsapp':
        return 'whatsapp';
      case 'twitter':
        return 'twitter';
      case 'linkedin':
        return 'linkedin';
      case 'reddit':
        return 'reddit';
      case 'copy':
        return 'copy';
      default:
        return '';
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'facebook':
        return 'Facebook';
      case 'whatsapp':
        return 'WhatsApp';
      case 'twitter':
        return ' Twitter';
      case 'linkedin':
        return 'Linkedin';
      case 'reddit':
        return 'Reddit';
      case 'copy':
        return 'Copiar Link';
      default:
        return '';
    }
  };

  return (
    <button onClick={handleClick}>
      <i className={`fa fa-${getIconName()} fa-1x`}/> {getButtonText()}
    </button>
  );
};

export default ShareButton;
