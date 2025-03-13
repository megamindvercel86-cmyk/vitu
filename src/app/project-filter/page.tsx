"use client";


import Layout from '@/components/Layout/Layout';
import PrjectFilter from '@/components/ProjectFilterComponent/CardComponent/CardComponent';
import React from 'react'
const NAVBAR_CONFIG = {
  props: {
    showGetInTouch: false,
  },
};

const page = () => {
  return (
    <Layout navbarProps={NAVBAR_CONFIG.props}>
    <PrjectFilter/>
    </Layout>
  )
}

export default page