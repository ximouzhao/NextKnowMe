import React,{Component} from 'react'
import { Menu,Layout} from 'antd';
import Link from 'next/link';
import './MainLeftMenu.css';
import {
  HomeOutlined,
  BulbOutlined,
  ReadOutlined,
  GithubOutlined,
  WeiboOutlined,
  MessageOutlined,
  SearchOutlined
} from '@ant-design/icons';


const { SubMenu } = Menu;
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
                    <Link href="/app/home">
                      <span>
                        <HomeOutlined/>主页
                      </span>
                    </Link>
              </Menu.Item>
              <Menu.Item key="think">
                <Link href="/app/think">
                <span>
                    <BulbOutlined />
                      <span>随想</span>
                    </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="article">
                  <Link href="/app/article">
                    <span>
                      <ReadOutlined />
                      <span>文章</span>
                    </span>
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
                  <Link href="/app/messageBoard">
                    <span><MessageOutlined />留言</span>
                  </Link>
                    
              </Menu.Item>
              <Menu.Item key="search">
                  <Link href="/app/search">
                    <span><SearchOutlined />Search</span>
                  </Link>
                    
              </Menu.Item>
              </Menu>
          </Layout>);
    }
}
export default MainLeftMenu;