import React from 'react';


const buttonStyleMap = {
  naver: {
    bg: '#1EC800',
    text: '네이버 계정으로 로그인',
    icon: '/naver-icon.png', // ✅ public 폴더 바로 아래에 있는 경우 이렇게 경로를 지정합니다.
  },
  kakao: {
    bg: '#FEE500',
    text: '카카오 계정으로 로그인',
    color: '#3C1E1E',
    icon: '/kakao-icon.png', // ✅ public 폴더 바로 아래에 있는 경우 이렇게 경로를 지정합니다.
  },
  facebook: {
    bg: '#1877F2',
    text: '페이스북 계정으로 로그인',
    icon: '/facebook-icon.png', // ✅ public 폴더 바로 아래에 있는 경우 이렇게 경로를 지정합니다.
  },
  google: {
    bg: '#FFFFFF',
    text: '구글 계정으로 로그인',
    color: '#000000',
    border: '1px solid #ccc',
    icon: '/google-icon.png', // ✅ public 폴더 바로 아래에 있는 경우 이렇게 경로를 지정합니다.
  },
};

export default function SocialLoginButton({ type }) {
  const style = buttonStyleMap[type];

  const handleLogin = () => {
    const baseUrl = "https://sociallogin-tyc7.onrender.com/oauth2/authorization"; // ✅ 배포 URL
    window.location.href = `${baseUrl}/${type}`;
  };

  if (!style) {
    console.error(`알 수 없는 소셜 로그인 타입입니다: ${type}`);
    return null;
  }

  return (
    <button
      className="mobile-social-login-button"
      style={{
        backgroundColor: style.bg,
        color: style.color || 'white',
        border: style.border || 'none',
        width: '80%',
        height: '48px',
        margin: '8px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '999px',
        fontWeight: 'bold',
        fontSize: '14px',
      }}
      onClick={handleLogin}
    >
      {style.icon && (
        <img
          src={style.icon} // ✅ 이제 이 src에 public 폴더 경로가 들어갑니다.
          alt={`${type} 아이콘`}
          style={{
            width: '24px',
            height: '24px',
            marginRight: '12px',
          }}
        />
      )}
      {style.text}
    </button>
  );
}
