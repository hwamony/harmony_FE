import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/AxiosManager';

import { Menu, MenuItem, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { IconMoreHoriz } from '../../assets/icons';

const MoreComment = ({ postId, commentId, setOnEdit }) => {
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickEdit = () => {
    setOnEdit(true);
    handleClose();
  };

  const { mutate: deleteComComment } = useMutation(
    () => api.delete(`/posts/${postId}/comments/${commentId}`),
    {
      onSuccess: () => {
        alert('댓글을 성공적으로 삭제했습니다.');
        return queryClient.invalidateQueries(['communityPost']);
      },
      onError: (err) => console.log(err),
    },
  );

  return (
    <>
      <IconButton
        id="more-button"
        aria-controls={open ? 'more-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <IconMoreHoriz />
      </IconButton>

      <StyledMenu
        id="more-menu"
        MenuListProps={{
          'aria-labelledby': 'more-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={onClickEdit} disableRipple>
          <MdModeEdit />
          댓글수정
        </MenuItem>
        <MenuItem
          onClick={() => {
            const res = confirm('댓글을 삭제하시겠습니까?');
            if (res) deleteComComment();
          }}
          disableRipple
        >
          <MdDelete />
          댓글삭제
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default MoreComment;

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 120,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& svg': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: '10px',
        '& circle': {
          fill: '#bababa',
        },
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
