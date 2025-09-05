import React, { useState } from 'react';
import styled from 'styled-components';

// 제보글 타입 정의
interface ContactPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  status: 'pending' | 'answered' | 'closed';
  password: string;
  reportImage?: string; // 제보사진 필드 추가
  answer?: string;
  answerDate?: string;
}

const PageContainer = styled.div`
  min-height: 100vh;
  background: #F2F4F8;
  padding: 100px 20px 20px 20px; /* 상단 패딩 추가 */
  font-family: 'Noto Sans KR', sans-serif;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 10px;
    font-weight: 600;
  }
  
  p {
    font-size: 1.1rem;
    color: #666;
    margin: 0;
  }
`;

const ContactBoard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  margin-bottom: 30px;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h2 {
    color: #333;
    margin: 0;
    font-size: 1.8rem;
  }
  
  .new-contact-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      background: #0056b3;
      transform: translateY(-2px);
    }
  }
`;

const PostList = styled.div`
  .post-item {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 20px;
    border: 1px solid #e0e0e0; /* 테두리 추가 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); /* 그림자 추가 */
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }
    
    .post-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      
      .post-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: #333;
        margin: 0;
      }
      
      .post-status {
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        
        &.pending {
          background: #fff3cd;
          color: #856404;
        }
        
        &.answered {
          background: #d4edda;
          color: #155724;
        }
        
        &.closed {
          background: #f8d7da;
          color: #721c24;
        }
      }
    }
    
    .post-meta {
      display: flex;
      gap: 20px;
      margin-bottom: 15px;
      font-size: 0.9rem;
      color: #666;
      
      .meta-item {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
    
    .post-content {
      color: #333;
      line-height: 1.6;
      margin-bottom: 15px;
    }
    
    .post-answer {
      background: #E4F1FE; /* 관리자 답변 박스 배경색 수정 */
      border-radius: 10px;
      padding: 20px;
      margin-top: 15px;
      border-left: 3px solid #007bff; /* 답변 박스 왼쪽 테두리 색상도 #007bff 계열로 변경 */
      
      .answer-header {
        font-weight: 600;
        color: #0056b3; /* 답변 헤더 텍스트 색상 변경 */
        margin-bottom: 10px;
        font-size: 0.9rem;
      }
      
      .answer-content {
        color: #333;
        line-height: 1.6;
      }
    }
  }
`;

const ReportImageThumbnail = styled.img`
  max-width: 150px; // 썸네일 최대 너비
  max-height: 100px; // 썸네일 최대 높이
  object-fit: contain;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px; /* 이미지와 내용 사이 간격 추가 */
  border: 1px solid #e0e0e0; /* 이미지 테두리 추가 */
  display: block;
`;

// 제보하기 모달 스타일
const ContactModal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  min-width: 500px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  
  h3 {
    margin: 0 0 30px 0;
    color: #333;
    font-size: 1.5rem;
    text-align: center;
  }
  
  .close-btn {
    position: absolute;
    top: 20px;
    right: 25px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      color: #333;
      background: #f0f0f0;
    }
  }
`;

// 제보 상세 모달 스타일
const ReportDetailModalContainer = styled(ContactModal)``; // ContactModal의 스타일 재사용

const ReportDetailContent = styled(ModalContent)`
  h3 {
    margin-bottom: 20px;
  }
  .detail-meta {
    font-size: 0.95rem;
    color: #555;
    margin-bottom: 15px;
    span {
      margin-right: 15px;
    }
  }
  .detail-content {
    background: #f8f9fa;
    border-left: 3px solid #007bff;
    padding: 15px;
    border-radius: 8px;
    line-height: 1.6;
    color: #333;
    margin-top: 15px;
    margin-bottom: 25px;
  }
  .detail-action-buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    button {
      flex: 1;
      padding: 12px;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      &.edit-btn {
        background: #007bff;
        color: white;
        border: none;
        &:hover {
          background: #0056b3;
        }
      }
      &.delete-btn {
        background: #dc3545;
        color: white;
        border: none;
        &:hover {
          background: #c82333;
        }
      }
    }
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px; // 상세 보기 및 업로드 미리보기 이미지 최대 높이
  object-fit: contain;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 15px;
  display: block;
`;

const UploadMessage = styled.p`
  font-size: 0.9rem;
  color: #28a745;
  margin-top: 5px;
`;

// 비밀번호 입력 모달 스타일
const PasswordModal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PasswordModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  min-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  
  h3 {
    margin: 0 0 30px 0;
    color: #333;
    font-size: 1.5rem;
    text-align: center;
  }
  
  .close-btn {
    position: absolute;
    top: 20px;
    right: 25px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      color: #333;
      background: #f0f0f0;
    }
  }
  
  .password-input {
    width: 100%;
    padding: 15px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    margin-bottom: 20px;
    text-align: center;
    letter-spacing: 2px;
    
    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
  
  .action-buttons {
    display: flex;
    gap: 15px;
    
    button {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.edit-btn {
        background: #28a745;
        color: white;
        
        &:hover {
          background: #218838;
        }
      }
      
      &.delete-btn {
        background: #dc3545;
        color: white;
        
        &:hover {
          background: #c82333;
        }
      }
    }
  }
`;

// 수정 모달 스타일
const EditModal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const EditModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  min-width: 500px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  
  h3 {
    margin: 0 0 30px 0;
    color: #333;
    font-size: 1.5rem;
    text-align: center;
  }
  
  .close-btn {
    position: absolute;
    top: 20px;
    right: 25px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      color: #333;
      background: #f0f0f0;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  
  label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #007bff;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const SettingsModal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const SettingsContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  min-width: 300px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  
  h3 {
    margin: 0 0 20px 0;
    color: #333;
  }
  
  .setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    
    label {
      font-weight: 500;
      color: #333;
    }
    
    .toggle-switch {
      position: relative;
      width: 50px;
      height: 24px;
      background: #ccc;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.3s ease;
      
      &.active {
        background: #007bff;
      }
      
      .slider {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        transition: transform 0.3s ease;
        
        &.active {
          transform: translateX(26px);
        }
      }
    }
  }
  
  .close-btn {
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    
    &:hover {
      color: #333;
    }
  }
`;

const ContactPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReportDetailModalOpen, setIsReportDetailModalOpen] = useState(false); // 제보 상세 모달 상태
  const [selectedPost, setSelectedPost] = useState<ContactPost | null>(null);
  const [password, setPassword] = useState('');
  const [imageUploadMessage, setImageUploadMessage] = useState(''); // 이미지 업로드 메시지 상태

  const [contactPosts, setContactPosts] = useState<ContactPost[]>([
    {
      id: 1,
      title: "의암호 수질 개선에 대한 제보",
      content: "의암호의 수질이 개선되고 있다고 하는데, 구체적으로 어떤 지표가 개선되었는지 궁금합니다. 또한 향후 수질 관리 계획도 알려주시면 감사하겠습니다.",
      author: "춘천시민",
      date: "2025-09-05", // 날짜 수정
      status: "answered",
      password: "1234",
      reportImage: "", // 제보사진 플레이스홀더
      answer: "의암호 수질 개선 상황에 대해 답변드립니다. 탁도는 30% 감소, 조류는 45% 감소, 용존산소량은 20% 증가했습니다. 향후에는 지속적인 모니터링과 예방적 관리로 수질을 유지할 예정입니다.",
      answerDate: "2025-09-06"
    },
    {
      id: 2,
      title: "수질 측정소 위치 제보",
      content: "춘천시에 설치된 수질 측정소의 정확한 위치와 측정 주기를 알고 싶습니다. 시민들이 직접 확인할 수 있는 방법이 있나요?",
      author: "환경관심시민",
      date: "2025-09-04", // 날짜 수정
      status: "pending",
      password: "5678",
      reportImage: "", // 제보사진 플레이스홀더
    },
    {
      id: 3,
      title: "조류 경고 시스템 개선 제안",
      content: "현재 조류 경고 시스템이 있지만, 더 정확하고 빠른 알림이 필요합니다. 스마트폰 앱을 통한 실시간 알림 서비스 도입을 제안합니다.",
      author: "수질전문가",
      date: "2025-09-03", // 날짜 수정
      status: "closed",
      password: "9999",
      reportImage: "", // 제보사진 플레이스홀더
    }
  ]);
  
  const [newContact, setNewContact] = useState({
    title: '',
    content: '',
    author: '',
    password: '',
    reportImage: '', // 제보사진 상태 추가
  });

  const [editContact, setEditContact] = useState({
    title: '',
    content: '',
    author: '',
    reportImage: '', // 제보사진 상태 추가
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNewContact = () => {
    setIsContactModalOpen(true);
    setImageUploadMessage(''); // 모달 열릴 때 메시지 초기화
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
    setNewContact({ title: '', content: '', author: '', password: '', reportImage: '' });
    setImageUploadMessage(''); // 모달 닫을 때 메시지 초기화
  };

  const handleSubmitContact = () => {
    if (!newContact.title.trim() || !newContact.content.trim() || !newContact.author.trim() || !newContact.password.trim()) {
      alert('모든 필수 필드를 입력해주세요.');
      return;
    }

    const newPost: ContactPost = {
      id: Date.now(),
      title: newContact.title,
      content: newContact.content,
      author: newContact.author,
      date: "2025-09-05", // 현재 날짜 대신 고정 날짜로 변경
      status: 'pending',
      password: newContact.password,
      reportImage: newContact.reportImage // 제보사진 포함
    };

    setContactPosts([newPost, ...contactPosts]);
    handleCloseContactModal();
    alert('제보글이 성공적으로 등록되었습니다.'); // 메시지 변경
  };

  const handlePostClick = (post: ContactPost) => {
    setSelectedPost(post);
    setIsReportDetailModalOpen(true); // 상세 보기 모달 열기
  };

  const handleCloseReportDetailModal = () => {
    setIsReportDetailModalOpen(false);
    setSelectedPost(null);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setSelectedPost(null);
    setPassword('');
  };

  const handlePasswordSubmit = (action: 'edit' | 'delete') => {
    if (!selectedPost) return;
    
    if (password === selectedPost.password) {
      setIsPasswordModalOpen(false);
      setPassword('');
      if (action === 'edit') {
        handleEdit();
      } else if (action === 'delete') {
        handleDelete();
      }
    } else {
      alert('비밀번호가 일치하지 않습니다.');
      setPassword('');
    }
  };

  const handleEdit = () => {
    if (!selectedPost) return;
    
    setEditContact({
      title: selectedPost.title,
      content: selectedPost.content,
      author: selectedPost.author,
      reportImage: selectedPost.reportImage || '', // 제보사진 포함
    });
    setIsEditModalOpen(true);
    setImageUploadMessage(''); // 모달 열릴 때 메시지 초기화
  };

  const handleDelete = () => {
    if (!selectedPost) return;
    
    if (window.confirm('정말로 이 제보글을 삭제하시겠습니까?')) { // 메시지 변경
      setContactPosts(contactPosts.filter(post => post.id !== selectedPost.id));
      setIsPasswordModalOpen(false);
      setSelectedPost(null);
      alert('제보글이 삭제되었습니다.'); // 메시지 변경
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPost(null);
    setEditContact({ title: '', content: '', author: '', reportImage: '' });
    setImageUploadMessage(''); // 모달 닫을 때 메시지 초기화
  };

  const handleSubmitEdit = () => {
    if (!selectedPost) return;
    
    if (!editContact.title.trim() || !editContact.content.trim() || !editContact.author.trim()) {
      alert('모든 필수 필드를 입력해주세요.');
      return;
    }

    setContactPosts(contactPosts.map(post => 
      post.id === selectedPost.id 
        ? { ...post, ...editContact }
        : post
    ));

    handleCloseEditModal();
    alert('제보글이 수정되었습니다.'); // 메시지 변경
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '답변대기';
      case 'answered': return '답변완료';
      case 'closed': return '처리완료';
      default: return '확인중';
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        {/* CommonHeader 제거 */}
        
        <PageHeader>
          <h1>제보하기</h1> {/* 제목 변경 */}
          <p>춘천시 수질 문제에 관한 제보를 해주세요</p> {/* 안내 문구 변경 */}
        </PageHeader>

        <ContactBoard>
          <BoardHeader>
            <h2> 제보 게시판</h2> {/* 제목 변경 */}
            <button className="new-contact-btn" onClick={handleNewContact}>
              제보하기 {/* 버튼 텍스트 변경 */}
            </button>
          </BoardHeader>
          
          <PostList>
            {contactPosts.map((post) => (
              <div 
                key={post.id} 
                className="post-item"
                onClick={() => handlePostClick(post)}
              >
                <div className="post-header">
                  <h3 className="post-title">{post.title}</h3>
                  <span className={`post-status ${post.status}`}>
                    {getStatusText(post.status)}
                  </span>
                </div>
                
                <div className="post-meta">
                  <span className="meta-item">
                    {post.author}
                  </span>
                  <span className="meta-item">
                     {post.date}
                  </span>
                </div>
                
                {post.reportImage && (
                  <div className="post-image">
                    <ReportImageThumbnail src={post.reportImage} alt="제보 사진" />
                  </div>
                )}

                <div className="post-content">
                  {post.content}
                </div>
                
                {post.answer && (
                  <div className="post-answer">
                    <div className="answer-header">
                       답변 ({post.answerDate})
                    </div>
                    <div className="answer-content">
                      {post.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </PostList>
        </ContactBoard>
      </ContentWrapper>

      {/* 새로운 제보하기 모달 */}
      <ContactModal $isOpen={isContactModalOpen}>
        <ModalContent>
          <button 
            className="close-btn" 
            onClick={handleCloseContactModal}
          >
            ×
          </button>
          <h3> 새로운 제보하기</h3> {/* 제목 변경 */}
          
          <FormGroup>
            <label htmlFor="title">제목 *</label>
            <input
              id="title"
              type="text"
              placeholder="제보 제목을 입력하세요"
              value={newContact.title}
              onChange={(e) => setNewContact({...newContact, title: e.target.value})}
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="author">작성자 *</label>
            <input
              id="author"
              type="text"
              placeholder="작성자명을 입력하세요"
              value={newContact.author}
              onChange={(e) => setNewContact({...newContact, author: e.target.value})}
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="password">비밀번호 *</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={newContact.password}
              onChange={(e) => setNewContact({...newContact, password: e.target.value})}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="reportImage">제보 사진</label> {/* 별표 제거 */}
            <input
              id="reportImage"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setNewContact({...newContact, reportImage: event.target?.result as string});
                    setImageUploadMessage('이미지가 첨부되었습니다.');
                  };
                  reader.readAsDataURL(e.target.files[0]);
                } else {
                  setNewContact({...newContact, reportImage: ''});
                  setImageUploadMessage('');
                }
              }}
            />
            {imageUploadMessage && <UploadMessage>{imageUploadMessage}</UploadMessage>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="content">제보 내용 *</label> {/* 라벨 변경 */}
            <textarea
              id="content"
              placeholder="제보하실 내용을 자세히 입력해주세요"
              value={newContact.content}
              onChange={(e) => setNewContact({...newContact, content: e.target.value})}
            />
          </FormGroup>
          
          <SubmitButton onClick={handleSubmitContact}>
            제보하기 {/* 버튼 텍스트 변경 */}
          </SubmitButton>
        </ModalContent>
      </ContactModal>

      {/* 제보 상세 모달 */}
      <ReportDetailModalContainer $isOpen={isReportDetailModalOpen}>
        <ReportDetailContent>
          <button 
            className="close-btn" 
            onClick={handleCloseReportDetailModal}
          >
            ×
          </button>
          {selectedPost && (
            <>
              <h3>{selectedPost.title}</h3>
              <div className="detail-meta">
                <span>작성자: {selectedPost.author}</span>
                <span>날짜: {selectedPost.date}</span>
              </div>
              {selectedPost.reportImage && (
                <ImagePreview src={selectedPost.reportImage} alt="제보 사진" />
              )}
              <div className="detail-content">
                {selectedPost.content}
              </div>
              <div className="detail-action-buttons">
                <button className="edit-btn" onClick={() => {
                  setIsReportDetailModalOpen(false);
                  setIsPasswordModalOpen(true);
                }}>
                   수정하기
                </button>
                <button className="delete-btn" onClick={() => {
                  setIsReportDetailModalOpen(false);
                  setIsPasswordModalOpen(true);
                }}>
                   삭제하기
                </button>
              </div>
            </>
          )}
        </ReportDetailContent>
      </ReportDetailModalContainer>

      {/* 비밀번호 입력 모달 */}
      <PasswordModal $isOpen={isPasswordModalOpen}>
        <PasswordModalContent>
          <button 
            className="close-btn" 
            onClick={handleClosePasswordModal}
          >
            ×
          </button>
          <h3> 비밀번호를 입력해주세요</h3>
          
          <input
            type="password"
            className="password-input"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit(selectedPost?.id === selectedPost?.id ? 'edit' : 'delete')}
          />
          
          <div className="action-buttons">
            <button className="edit-btn" onClick={() => handlePasswordSubmit('edit')}>
               확인
            </button>
            <button className="delete-btn" onClick={() => handlePasswordSubmit('delete')}>
               취소
            </button>
          </div>
        </PasswordModalContent>
      </PasswordModal>

      {/* 수정 모달 */}
      <EditModal $isOpen={isEditModalOpen}>
        <EditModalContent>
          <button 
            className="close-btn" 
            onClick={handleCloseEditModal}
          >
            ×
          </button>
          <h3> 제보글 수정</h3> {/* 제목 변경 */}
          
          <FormGroup>
            <label htmlFor="edit-title">제목 *</label>
            <input
              id="edit-title"
              type="text"
              placeholder="제보 제목을 입력하세요"
              value={editContact.title}
              onChange={(e) => setEditContact({...editContact, title: e.target.value})}
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="edit-author">작성자 *</label>
            <input
              id="edit-author"
              type="text"
              placeholder="작성자명을 입력하세요"
              value={editContact.author}
              onChange={(e) => setEditContact({...editContact, author: e.target.value})}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="edit-reportImage">제보 사진</label> {/* 별표 제거 */}
            <input
              id="edit-reportImage"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setEditContact({...editContact, reportImage: event.target?.result as string});
                    setImageUploadMessage('이미지가 첨부되었습니다.');
                  };
                  reader.readAsDataURL(e.target.files[0]);
                } else {
                  setEditContact({...editContact, reportImage: ''});
                  setImageUploadMessage('');
                }
              }}
            />
            {imageUploadMessage && <UploadMessage>{imageUploadMessage}</UploadMessage>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="edit-content">제보 내용 *</label> {/* 라벨 변경 */}
            <textarea
              id="edit-content"
              placeholder="제보하실 내용을 자세히 입력해주세요"
              value={editContact.content}
              onChange={(e) => setEditContact({...editContact, content: e.target.value})}
            />
          </FormGroup>
          
          <SubmitButton onClick={handleSubmitEdit}>
            수정 완료
          </SubmitButton>
        </EditModalContent>
      </EditModal>

      {/* 설정 모달 (기존 유지) */}
      <SettingsModal $isOpen={isSettingsOpen}>
        <SettingsContent>
          <button 
            className="close-btn" 
            onClick={() => setIsSettingsOpen(false)}
          >
            ×
          </button>
          <h3>설정</h3>
          <div className="setting-item">
            <label>다크모드</label>
            <div 
              className={`toggle-switch ${isDarkMode ? 'active' : ''}`}
              onClick={toggleDarkMode}
            >
              <div className={`slider ${isDarkMode ? 'active' : ''}`}></div>
            </div>
          </div>
        </SettingsContent>
      </SettingsModal>
    </PageContainer>
  );
};

export default ContactPage;
