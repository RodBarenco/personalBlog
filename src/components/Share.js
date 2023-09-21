import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

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
      case 'copy':
        return 'copy';
      default:
        return '';
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'facebook':
        return ' Facebook';
      case 'whatsapp':
        return ' WhatsApp';
      case 'twitter':
        return ' Twitter';
      case 'copy':
        return 'Copiar Link';
      default:
        return '';
    }
  };

  return (
    <
        button onClick={handleClick} 
        style={{
            height: '49px',
            backgroundColor: 'transparent',
            color: 'white',
            margin: '2px',
            borderRadius: '8px'
        }}
    >
      <i className={`fa fa-${getIconName()} fa-1x`}/> {getButtonText()}
    </button>
  );
};

export default ShareButton;
