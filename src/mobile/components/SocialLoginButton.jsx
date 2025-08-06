import React from 'react';

const buttonStyleMap = {
  naver: {
    className: 'btn-naver',
    text: '네이버 계정으로 로그인',
    icon: '/naver-icon.png',
  },
  kakao: {
    className: 'btn-kakao',
    text: '카카오 계정으로 로그인',
    icon: '/kakao-icon.png',
  },
  facebook: {
    className: 'btn-facebook',
    text: '페이스북 계정으로 로그인',
    icon: '/facebook-icon.png',
  },
  google: {
    className: 'btn-google',
    text: '구글 계정으로 로그인',
    icon: '/google-icon.png',
  },
};

export default function SocialLoginButton({ type }) {
  const style = buttonStyleMap[type];

  const handleLogin = () => {
    const baseUrl = process.env.REACT_APP_OAUTH_BASE_URL || "https://sociallogin-tyc7.onrender.com/oauth2/authorization";
    window.location.href = `${baseUrl}/${type}`;
  };

  if (!style) {
    console.error(`알 수 없는 소셜 로그인 타입입니다: ${type}`);
    return null;
  }

  return (
    <button
      className={`mobile-social-login-button ${style.className}`}
      style={{
        width: '80%',
        height: '48px',
        margin: '8px auto',
        borderRadius: '24px',
        fontWeight: 'bold',
        fontSize: '15px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '16px',
        boxSizing: 'border-box',
        position: 'relative',
        border: style.className === 'btn-google' ? '1px solid #ccc' : 'none',
      }}
      onClick={handleLogin}
      type="button"
    >
      {style.icon && (
        <img
          src={style.icon}
          alt={`${type} 아이콘`}
          style={{
            width: '20px',
            height: '20px',
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            userSelect: 'none',
          }}
          draggable={false}
        />
      )}
      <span style={{ flex: 1, textAlign: 'center', userSelect: 'none' }}>
        {style.text}
      </span>
    </button>
  );
}
