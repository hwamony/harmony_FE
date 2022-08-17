import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/AxiosManager';

import { Menu, MenuItem, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { MdMoreVert, MdModeEdit, MdDelete } from 'react-icons/md';

const MoreVert = ({ schedule }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteSchedule = async () => {
    try {
      const res = await api.delete(`/schedules/${schedule.scheduleId}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const { mutate: deleteData } = useMutation(deleteSchedule, {
    onSuccess: (res) => {
      alert(res.data.msg);
      queryClient.invalidateQueries(['schedule']);
    },
  });

  const onClickEdit = () => {
    console.log(schedule.scheduleId);
    navigate('/schedules/edit', { state: schedule });
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
        <MdMoreVert />
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
          수정
        </MenuItem>
        <MenuItem onClick={deleteData} disableRipple>
          <MdDelete />
          삭제
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default MoreVert;

MoreVert.propTypes = {
  schedule: PropTypes.object.isRequired,
};

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
