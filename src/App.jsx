import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Background from './components/Background';
import SearchBar from './components/SearchBar';
import { Checkbox, CheckboxGroup } from './components/Checkbox';
import Tag from './components/Tag';
import mockData from './mock-data';

function App() {
  const [mockList, setMockList] = useState(mockData);
  const [checkedList, setCheckedList] = useState(['iPhone 5s', 'iPhone 6', 'iPhone 12 Pro', 'Google Pixel 2']);
  const [checkedAll, setCheckedAll] = useState(false);

  /** 搜索 */
  const handleSearch = (value) => {
    const list = mockData.filter((item) => item.toLocaleUpperCase().includes(value.toLocaleUpperCase()));
    setMockList(list);
  };

  /** 全选 */
  const handleCheckboxAllChange = (value) => {
    setCheckedAll(value);
    setCheckedList(value ? mockData : []);
  };
  /** 单选 */
  const handleCheckboxChange = (list) => {
    setCheckedList(list);
    setCheckedAll(list.length === mockList.length);
  };

  /** 删除标签 */
  const handleTagRemove = (value) => {
    const list = checkedList.filter((item) => item !== value);
    setCheckedList(list);
    setCheckedAll(false);
  };

  /** 清除所有 */
  const handleCheckedClear = () => {
    setCheckedList([]);
    setCheckedAll(false);
  };

  /** 复制到剪贴板 */
  const handleTagsCopy = async () => {
    const text = checkedList.toString();
    try {
      await navigator.clipboard.writeText(text);
      alert('已复制到剪切板！');
    } catch ({ message }) {
      alert(`复制失败：${message}`);
    }
  };

  return (
    <Background className="min-w-1200">
      <div className="h-full w-full bg-white rounded-xl shadow-md flex">
        <div className="w-3/12 border-r border-gray-200 flex flex-col">
          <div className="p-6 pb-0 bg-ground h-32">
            <SearchBar placeholder="查询" className="mb-4" onSearch={handleSearch}></SearchBar>
            <Checkbox onChange={handleCheckboxAllChange} checked={checkedAll} indeterminate className="-ml-2">
              选择所有
            </Checkbox>
          </div>
          <div className="px-6 overflow-y-auto flex-1 -ml-2">
            <CheckboxGroup values={checkedList} onChange={handleCheckboxChange}>
              {mockList.map((value) => (
                <Checkbox key={value} value={value}>
                  {value}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col justify-end h-32 bg-ground">
            <div className="flex justify-between px-4">
              <div className="text-gray-400">（{checkedList.length}）已选择</div>
              <div className="text-theme flex items-center pb-6">
                <button onClick={handleTagsCopy} className="mx-8 active:text-minor outline-none" type="button">
                  复制所有
                </button>
                <div className="border-r-2 border-gray-200 h-6 "></div>
                <button onClick={handleCheckedClear} className="mx-8 active:text-minor outline-none" type="button">
                  清除所有
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <TransitionGroup>
              {checkedList.map((value) => (
                <CSSTransition
                  key={value}
                  timeout={300}
                  classNames={{
                    enter: 'animate__animated animate__faster',
                    enterActive: 'animate__bounceIn',
                    exit: 'animate__animated animate__faster',
                    exitActive: 'animate__fadeOut'
                  }}
                >
                  <Tag onClose={handleTagRemove}>{value}</Tag>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default App;
