import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar'; // 기존 Sidebar 컴포넌트 (이번 코드에서는 직접 사용하지 않음)
import SearchBar from './SearchBar';
import AccountTable from './AccountTable';
import Pagination from './Pagination';

// 추가 메뉴 컴포넌트
function AdditionalMenu() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h3>추가 메뉴</h3>
      <p>추가 메뉴 관련 내용을 여기에 작성하세요.</p>
    </div>
  );
}

// 사이드바 내부에 메뉴 선택 UI 컴포넌트
function SidebarMenu({ selectedMenu, onSelectMenu }) {
  return (
    <div style={{ 
        padding: '20px', 
        color: '#E0F2F7', 
        height: '100%', // 사이드바 높이를 꽉 채우도록 설정
        boxSizing: 'border-box', // padding이 높이에 포함되도록
        backgroundColor: 'transparent' // ✅ 이 부분을 추가하여 부모의 남색 배경이 보이도록 합니다.
    }}> 
      <h3 style={{ marginBottom: '20px', color: '#FFFFFF' }}>메뉴 선택</h3> 
      <button
        onClick={() => onSelectMenu('account')}
        style={{
          display: 'block',
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          fontWeight: selectedMenu === 'account' ? 'bold' : 'normal',
          backgroundColor: selectedMenu === 'account' ? '#004080' : 'transparent', 
          color: selectedMenu === 'account' ? '#FFFFFF' : '#E0F2F7', 
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          borderRadius: '4px',
          transition: 'background-color 0.2s, color 0.2s',
          whiteSpace: 'nowrap', // 텍스트가 줄바꿈되지 않도록
        }}
      >
        계정 관리
      </button>
      <button
        onClick={() => onSelectMenu('additional')}
        style={{
          display: 'block',
          width: '100%',
          padding: '10px',
          fontWeight: selectedMenu === 'additional' ? 'bold' : 'normal',
          backgroundColor: selectedMenu === 'additional' ? '#004080' : 'transparent', 
          color: selectedMenu === 'additional' ? '#FFFFFF' : '#E0F2F7', 
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          borderRadius: '4px',
          transition: 'background-color 0.2s, color 0.2s',
          whiteSpace: 'nowrap', // 텍스트가 줄바꿈되지 않도록
        }}
      >
        추가 메뉴
      </button>
    </div>
  );
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const [selectedMenu, setSelectedMenu] = useState('account'); 

  const itemsPerPage = 9;
  const API_BASE_URL = "https://sociallogin-tyc7.onrender.com";

  // 로그인 사용자 정보 가져오기
  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/user`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          setCurrentUser(data);
        }
      })
      .catch((err) => console.error("로그인 사용자 정보 불러오기 실패:", err));
  }, []);

  // 유저 목록 불러오기 (계정 관리 메뉴 선택 시에만)
  useEffect(() => {
    if (selectedMenu !== 'account') return;

    const keywordParam = searchTerm.trim() ? `&keyword=${searchTerm}` : '';

    fetch(
      `${API_BASE_URL}/admin/users?page=${currentPage - 1}&size=${itemsPerPage}${keywordParam}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP 오류! 상태: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const formattedData = data.content.map((user, index) => ({
          id: user.id,
          name: user.name || '-',
          email: user.email || '-',
          gender: user.gender || '-',
          age: user.age || '-',
          info: user.provider || '-',
          index: (currentPage - 1) * itemsPerPage + index + 1,
        }));
        setUsers(formattedData);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => console.error("❌ 유저 목록 불러오기 실패:", err));
  }, [currentPage, searchTerm, selectedMenu]);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <div className="App" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* 사이드바 컨테이너 */}
      <div
        style={{
          width: sidebarOpen ? '250px' : '0',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          backgroundColor: '#003366', // ✅ 사이드바 배경을 남색으로 확실하게 지정
          boxShadow: sidebarOpen ? '2px 0 5px rgba(0,0,0,0.1)' : 'none',
          zIndex: 1000,
          position: 'relative', // 내용이 이 안에 오버플로우 되지 않도록
          height: '100%', // 뷰포트 높이 꽉 채우기
        }}
      >
        {sidebarOpen && (
          <SidebarMenu selectedMenu={selectedMenu} onSelectMenu={setSelectedMenu} />
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 헤더 */}
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          userMenuOpen={userMenuOpen}
          toggleUserMenu={() => setUserMenuOpen(!userMenuOpen)}
          currentUser={currentUser}
        />

        {/* 메인 콘텐츠 영역 */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            backgroundColor: '#fff', 
          }}
        >
          {selectedMenu === 'account' && (
            <>
              <h2 style={{ color: '#004080' }}>계정 관리</h2> 
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSubmit={handleSearch}
              />
              <AccountTable data={users}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </AccountTable>
            </>
          )}

          {selectedMenu === 'additional' && <AdditionalMenu />}
        </main>
      </div>
    </div>
  );
}
