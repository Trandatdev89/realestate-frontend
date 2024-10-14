// import { Button, Col, Form, Input, message, Row, Select } from 'antd';
// import React from 'react'
// import { myInfo } from '../../../../Services/UserServices';
// import { createCustomer } from '../../../../Services/CustomerServices';
// import { Option } from 'antd/es/mentions';

// function CreateCustomer() {
//   const rules = [
//     {
//       required: true,
//       message: "Please input your field!",
//     },
//   ];

//   const token=localStorage.getItem("token");

//   const [form] = Form.useForm();
//   const [messageAPI, contextHolder] = message.useMessage();

//   const handleFinish = async (values) => {
//     const res=await myInfo(token);
//     console.log(res);
//     values.createdby=res.data.fullname;
//     const result=await createCustomer(values,token);
//     console.log(result);
//     if (res.code === 200) {
//       form.resetFields();
//       messageAPI.open({
//         type: "success",
//         content: "Tạo mới sản phẩm thành công",
//         duration: 3,
//       });
//     } else {
//       messageAPI.open({
//         type: "error",
//         content: "Tạo mới sản phẩm thất bại!",
//         duration: 3,
//       });
//     }
//   };

//   const handleClick = () => {
//     form.resetFields();
//   };

//   return (
//     <>
//       {contextHolder}
//       <div>
//         <Form
//           layout="vertical"
//           onFinish={handleFinish}
//           form={form}
//         >
//           <Row gutter={[20]}>
//             <Col span={12}>
//               <Form.Item label="Tên đầy đủ" name="fullname">
//                 <Input placeholder="Tên đầy đủ..." rules={rules} />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item label="SDT" name="phone">
//                 <Input placeholder="SDT..." />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item label="email" name="email">
//                 <Input placeholder="email" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item label="nhu cầu" name="demand">
//                 <Select placeholder="nhu cầu">
//                   <Option value='mua'>mua</Option>
//                   <Option value='thue'>thuê</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={24}>
//               <Form.Item>
//                 <Button htmlType="submit" size="large" type="primary" className='me-2'>
//                   Tạo
//                 </Button>
//                 <Button
//                   onClick={handleClick}
//                   size="large"
//                   type="primary"
//                   danger
//                 >
//                   Hủy
//                 </Button>
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//     </>
//   );
// }

// export default CreateCustomer;
