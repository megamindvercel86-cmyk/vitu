"use client";


import Layout from '@/components/Layout/Layout';
import ProjectFilter from '@/components/ProjectsPageComponents/ProjectFilterComponent/CardComponent/CardComponent';

import React from 'react'
const NAVBAR_CONFIG = {
  props: {
    showGetInTouch: false,
  },
};

const page = () => {
  return (
    <Layout navbarProps={NAVBAR_CONFIG.props}>
    <ProjectFilter/>
    </Layout>
  )
}

export default page