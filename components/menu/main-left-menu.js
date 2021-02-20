import React,{Component} from 'react';
import { Menu,Layout} from 'antd';
import Link from 'next/link';
import './main-left-menu.css';
import {
  HomeOutlined,
  BulbOutlined,
  ReadOutlined,
  GithubOutlined,
  WeiboOutlined,
  MessageOutlined,
  SearchOutlined
} from '@ant-design/icons';

class MainLeftMenu extends Component{
    // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
    render(){
        return (
          <Layout style={{background:'#fff' }}>
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
              >
              <Menu.Item key="home">
                    <Link href="/">
                      <a>
                        <span>
                          <HomeOutlined/>主页
                        </span>
                      </a>
                    </Link>
              </Menu.Item>
              <Menu.Item key="think">
                <Link href="/think/1">
                  <a>
                    <span>
                        <BulbOutlined />
                        <span>随想</span>
                      </span>
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="article">
                  <Link href="/article/1">
                    <a>
                      <span>
                        <ReadOutlined />
                        <span>文章</span>
                      </span>
                    </a>
                  </Link>
              </Menu.Item>
              <Menu.Item key="github">
                <a href="https://github.com/ximouzhao" target="_blank" rel="noopener noreferrer">
                    <span>
                      <GithubOutlined />
                      <span>Github</span>
                    </span>
                </a>
              </Menu.Item>
              <Menu.Item key="weibo">
                  <a href="https://www.weibo.com/ximouzhao" target="_blank" rel="noopener noreferrer">
                    <span>
                            <WeiboOutlined />
                            <span>Weibo</span>
                    </span>
                  </a>
              </Menu.Item>
              <Menu.Item key="message">
                  <Link href="/message-board">
                    <a>
                      <span><MessageOutlined />留言</span>
                    </a>
                  </Link>
              </Menu.Item>
              <Menu.Item key="search">
                  <Link href="/my-search">
                    <a>
                      <span><SearchOutlined />Search</span>
                    </a>
                  </Link>
              </Menu.Item>
              </Menu>
          </Layout>);
    }
}
export default MainLeftMenu;