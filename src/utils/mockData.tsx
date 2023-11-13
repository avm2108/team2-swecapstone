import React from 'react';
import {
  StudentImage1,
  StudentImage2,
  StudentImage3,
  StudentImage4,
} from '../svgs';

export const headers = [
  'STATUS',
  'STUDENT',
  'RELEASE DATE',
  'APPROVAL DATE',
  '',
  '',
];

export const allRequests = [
  {
    status: {label: 'Pending', bgColor: '#FFF27D', color: '#214C34'},
    student: {
      name: 'Bryan Kim',
      image: <StudentImage1 />,
    },
    release_date: '10/16/2023',
    approval_date: 'N/A',
    viewAction: 'View',
    deleteAction: '',
  },
  {
    status: {label: 'Approved', bgColor: '#4EB780', color: '#214C34'},
    student: {
      name: 'Bryan Kim',
      image: <StudentImage2 />,
    },
    release_date: '10/12/2023',
    approval_date: '10/09/2023',
    viewAction: 'View',
    deleteAction: '',
  },
  {
    status: {label: 'Approved', bgColor: '#4EB780', color: '#214C34'},
    student: {
      name: 'Emily Kim',
      image: <StudentImage3 />,
    },
    release_date: '10/16/2023',
    approval_date: '10/12/2023',
    viewAction: 'View',
    deleteAction: '',
  },
  {
    status: {label: 'Approved', bgColor: '#4EB780', color: '#214C34'},
    student: {
      name: 'Bryan Kim',
      image: <StudentImage4 />,
    },
    release_date: '9/29/2023',
    approval_date: '9/28/2023',
    viewAction: 'View',
    deleteAction: '',
  },
  {
    status: {label: 'Pending', bgColor: '#FFF27D', color: '#214C34'},
    student: {
      name: 'Bryan Kim',
      image: <StudentImage1 />,
    },
    release_date: '10/19/2023',
    approval_date: 'N/A',
    viewAction: 'View',
    deleteAction: '',
  },
  {
    status: {label: 'Approved', bgColor: '#4EB780', color: '#214C34'},
    student: {
      name: 'Emily Kim',
      image: <StudentImage4 />,
    },
    release_date: '10/27/2023',
    approval_date: '10/18/2023',
    viewAction: 'View',
    deleteAction: '',
  },
  {
    status: {label: 'Approved', bgColor: '#4EB780', color: '#214C34'},
    student: {
      name: 'Emily Kim',
      image: <StudentImage3 />,
    },
    release_date: '10/03/2023',
    approval_date: '10/03/2023',
    viewAction: 'View',
    deleteAction: '',
  },
];
