import React, { Component } from 'react';
import { BackTop,Layout} from 'antd';
import MainLeftMenu from './menu/main-left-menu';
import logopng from '../resource/logo.486a892c.png';
import { PhotoProvider } from 'react-photo-view';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
  } from '@ant-design/icons';
import 'react-photo-view/dist/index.css';

const {Header,Content,Footer,Sider} =Layout;
const minMarginLeft=0;
const maxMarginLeft=200;
class KnowMeLayout extends Component {

  state={
    collapsed:false,
    rightLayoutStyle:{},
    padding:"",
    appContentMaskClassName:"appContentMask",
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    let animation=( collapsed)?'rightAreaCollapsed 0.2s':'rightAreaUnCollapsed 0.2s' ;
    let marginLeft=( collapsed)?minMarginLeft:maxMarginLeft ;
    console.log(animation);
    this.setState({ 
        collapsed,
        rightLayoutStyle:{marginLeft:marginLeft}
    });
  };
  toggle = () => {
      let isPhone=window.innerWidth<=768;
      let collapsed=!this.state.collapsed;
      let animation=( collapsed)?'rightAreaCollapsed 0.2s':'rightAreaUnCollapsed 0.2s' ;
      if(isPhone){
        if(collapsed){
          this.setState({
            collapsed: collapsed,
            appContentMaskClassName:"appContentMask",
          });
        }else{
          this.setState({
            collapsed: collapsed,
            appContentMaskClassName:"appContentMask appContentMaskOpen",
          });
        }
      }else{
        let marginLeft=( collapsed)?minMarginLeft:maxMarginLeft ;
        this.setState({
            collapsed: collapsed,
            rightLayoutStyle:{animation:animation,marginLeft:marginLeft,animationTimingTunction:'linear'},
            appContentMaskClassName:"appContentMask",
        });
      }
  };
  render() {
    return (
      <Layout style={{minHeight:'100vh'}}>
        <BackTop stype={{color:'#ff4d4f'}}/>
        <Header style={{background:'#ff4d4f',padding:0,position: 'fixed', width: '100%' ,boxShadow:'0 2px 8px rgba(255, 77, 79,0.45)',zIndex: 7}}>
            {
                this.state.collapsed ?<MenuFoldOutlined className="appTrigger" onClick={this.toggle}/>:<MenuUnfoldOutlined className="appTrigger" onClick={this.toggle}/>
            }
          <div className="logoDiv">
                <img className="logoPic" src={logopng}/>
          </div>
        </Header>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} 
                    breakpoint="lg" onBreakpoint={this.onCollapse} collapsedWidth={minMarginLeft}
                    className='appSider'
                >
          <MainLeftMenu/>
        </Sider>
        <Layout style={this.state.rightLayoutStyle} >
              <div className={this.state.appContentMaskClassName} onClick={this.toggle}></div>
              <PhotoProvider>
              <Content className="layoutContent" >
                {this.props.children}
              </Content>
              </PhotoProvider>
              <Footer style={{textAlign:'center'}}>Ximou Zhao ©2019 Created by Ximou Zhao 京ICP备19037635号-1</Footer>
        </Layout>
    </Layout>
    );
  }
}

export default KnowMeLayout;
