import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  Table,
  Tag,
  Button,
  Select,
  Image,
  Row,
  Col,
  Modal,
  Form,
  Input,
  message,
  DatePicker,
  Space,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { usePostCRUD } from "../../../hooks/usePostCRUD";
import { Category, PostMeta } from "contexts/siteWorkspace/siteWorkspaceTypes";

const categoryOptions = Object.entries(Category).map(([key, value]) => ({
  label: key === "ALL" ? "All" : value.charAt(0).toUpperCase() + value.slice(1),
  value,
}));

const Posts: React.FC = () => {
  const { id: siteId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>(Category.ALL);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostMeta | null>(null);
  const [form] = Form.useForm();
  const [dateRange, setDateRange] = useState<[any, any] | null>(null);
  const { fetchPosts, addPost, updatePost, deletePost } = usePostCRUD(siteId);
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = async (from?: Date, to?: Date) => {
    setLoading(true);
    try {
      const data = await fetchPosts(from, to);
      setPosts(data);
    } catch {
      message.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      loadPosts(dateRange[0].toDate(), dateRange[1].toDate());
    } else {
      loadPosts();
    }
    // eslint-disable-next-line
  }, [siteId, dateRange]);

  // Open modal for new post, clear form
  const handleAdd = () => {
    setEditingPost(null);
    form.resetFields();
    setModalOpen(true);
  };

  // Open modal for editing, set form with post data
  const handleEdit = (post: PostMeta) => {
    setEditingPost(post);
    form.setFieldsValue({
      ...post,
      // Ensure undefined fields are set to empty for form
      subtitle: post.subtitle || "",
      featuredImageUrl: post.featuredImageUrl || "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (post: PostMeta) => {
    try {
      await deletePost(post.id);
      setPosts(posts.filter((p) => p.id !== post.id));
      message.success("Deleted post");
    } catch {
      message.error("Delete failed");
    }
  };

  // Save modal (add/edit), clear form and state after
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingPost) {
        await updatePost(editingPost.id, values);
        setPosts(
          posts.map((p) =>
            p.id === editingPost.id ? { ...editingPost, ...values } : p
          )
        );
        message.success("Updated post");
      } else {
        const id = await addPost(values);
        setPosts([...posts, { id, ...values }]);
        message.success("Added post");
      }
      setModalOpen(false);
      setEditingPost(null);
      form.resetFields();
    } catch {
      message.error("Save failed");
    }
  };

  const filteredPosts =
    category === Category.ALL
      ? posts
      : posts.filter((post) => post.category === category);

  const columns = [
    {
      title: "Image",
      dataIndex: "featuredImageUrl",
      key: "image",
      render: (url: string) =>
        url ? (
          <Image
            src={url}
            width={48}
            height={48}
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
        ) : null,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 300,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "published"
            ? "green"
            : status === "draft"
            ? "orange"
            : "red";
        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Publish Date",
      dataIndex: "publishAt",
      key: "publishAt",
      render: (date: string) => (date ? new Date(date).toLocaleString() : "--"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: PostMeta) => (
        <>
          <Button
            type="primary"
            onClick={() =>
              navigate(`/user/workspace/${siteId}/post/${record.slug}`)
            }
            style={{ marginRight: 8 }}
          >
            View
          </Button>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Typography.Title level={2}>Posts</Typography.Title>
          <Typography.Text>
            Browse and manage your workspace posts. Click a post to view
            details.
          </Typography.Text>
        </Col>
        <Col>
          <Space>
            <Select
              style={{ minWidth: 140 }}
              value={category}
              options={categoryOptions}
              onChange={setCategory}
              placeholder="Filter by category"
            />
            <DatePicker.RangePicker
              onChange={setDateRange}
              allowClear
              style={{ minWidth: 220 }}
              format="YYYY-MM-DD"
              placeholder={["From", "To"]}
            />
            <Button type="primary" onClick={handleAdd}>
              Add Post
            </Button>
          </Space>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredPosts}
        rowKey="id"
        pagination={{ pageSize: 40 }}
        bordered
        size="middle"
        loading={loading}
      />
      <Modal
        title={editingPost ? "Edit Post" : "Add Post"}
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={() => {
          setModalOpen(false);
          setEditingPost(null);
          form.resetFields();
        }}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item name="category" label="Category">
            {" "}
            <Select
              options={categoryOptions.filter((opt) => opt.value !== "")}
            />{" "}
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            {" "}
            <Select
              options={[
                { value: "draft" },
                { value: "published" },
                { value: "archived" },
              ]}
            />{" "}
          </Form.Item>
          <Form.Item name="featuredImageUrl" label="Featured Image URL">
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item name="subtitle" label="Subtitle">
            {" "}
            <Input />{" "}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Posts;
