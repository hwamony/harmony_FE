import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/AxiosManager';

import { Menu, MenuItem, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { IconMoreHoriz } from '../../assets/icons';

const MoreHoriz = ({ album }) => {
  const navigate = useNavigate();
  const scheduleId = useParams().scheduleId;
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteAlbum = async () => {
    try {
      const res = await api.delete(`/galleries/${album.id}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const { mutate: deleteAlbumM } = useMutation(deleteAlbum, {
    onSuccess: (res) => {
      alert(res.data.msg);
      queryClient.invalidateQueries(['albums', scheduleId]);
    },
  });

  // TODO: 삭제 confirm 추가하기

  const onClickEdit = () => {
    console.log(album.id);
    navigate(`/galleries/posts/${scheduleId}/${album.id}/edit`, {
      state: album,
    });
    handleClose();
  };

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
          앨범수정
        </MenuItem>
        <MenuItem onClick={deleteAlbumM} disableRipple>
          <MdDelete />
          앨범삭제
        </MenuItem>
      </StyledMenu>
    </>
  );
};

MoreHoriz.propTypes = {
  album: PropTypes.object.isRequired,
};

export default MoreHoriz;

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
