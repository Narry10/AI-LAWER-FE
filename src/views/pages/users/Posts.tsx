import React, { useEffect, useMemo, useState } from "react";
import type { Dayjs } from "dayjs";
import {
  Typography,
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
import type { ColumnsType } from "antd/es/table";
import { useNavigate, useParams } from "react-router-dom";
import { usePostCRUD } from "../../../hooks/usePostCRUD";
import { Category, PostMeta } from "contexts/siteWorkspace/siteWorkspaceTypes";

const { Title, Text } = Typography;

/** Bảo toàn nếu Category là enum số + chuỗi (TypeScript enum) */
const categoryOptions = Object.entries(Category)
  .filter(([_, v]) => typeof v === "string")
  .map(([key, value]) => ({
    label: key === "ALL" ? "All" : (value as string).charAt(0).toUpperCase() + (value as string).slice(1),
    value: value as string,
}));

const Posts: React.FC = () => {
  const { id: siteId } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostMeta | null>(null);

  const [category, setCategory] = useState<string>(Category.ALL as unknown as string);
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);

  const { fetchPosts, addPost, updatePost, deletePost } = usePostCRUD(siteId);
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = async (from?: Date, to?: Date) => {
    setLoading(true);
    try {
      const data = await fetchPosts(from, to);
      setPosts(data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const reload = async () => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      await loadPosts(dateRange[0].toDate(), dateRange[1].toDate());
    } else {
      await loadPosts();
    }
  };

  /** Fetch khi đổi site hoặc date range */
  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId, dateRange]);

  /** Mở modal thêm mới */
  const handleAdd = () => {
    setEditingPost(null);
    setModalOpen(true);
  };

  /** Mở modal sửa */
  const handleEdit = (post: PostMeta) => {
    setEditingPost(post);
    setModalOpen(true);
  };

  /** Xóa (refetch sau khi xóa) */
  const handleDelete = async (post: PostMeta) => {
    try {
      await deletePost(post.id);
      await reload();
      message.success("Deleted post");
    } catch (err) {
      console.error(err);
      message.error("Delete failed");
    }
  };

  /** Lưu (thêm/sửa) → refetch, đóng modal */
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingPost) {
        await updatePost(editingPost.id, values);
        message.success("Updated post");
      } else {
        await addPost(values);
        message.success("Added post");
      }
      await reload();
      setModalOpen(false);
      setEditingPost(null);
      form.resetFields();
    } catch (err) {
      console.error(err);
      // validateFields sẽ ném lỗi nếu còn field thiếu; không hiện message ở đây để tránh trùng
    }
  };

  /** Filter theo category đã chọn */
  const filteredPosts = useMemo(
    () =>
      category === (Category.ALL as unknown as string)
        ? posts
        : posts.filter((post) => post.category === category),
    [category, posts]
  );

  // Build dynamic base URL for revalidate API
  const getRevalidateBaseUrl = (siteId: string) => {
    return `https://${siteId}.com/api/revalidate`;
  };

  // Clear cache for latest posts (không ảnh hưởng Firestore, chỉ API)
  const handleClearLatestCache = async () => {
    try {
      const baseUrl = getRevalidateBaseUrl(siteId as string);
      await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "posts", key: siteId }),
      });
      message.success("Cleared latest posts cache");
    } catch {
      message.error("Failed to clear latest posts cache");
    }
  };

  // Clear cache for post detail
  const handleClearPostCache = async (slug: string) => {
    try {
      const baseUrl = getRevalidateBaseUrl(siteId as string);
      await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "news", key: slug }),
      });
      message.success("Cleared post detail cache");
    } catch {
      message.error("Failed to clear post detail cache");
    }
  };

  /** Cột bảng */
  const columns: ColumnsType<PostMeta> = useMemo(
    () => [
      {
        title: "Image",
        dataIndex: "featuredImageUrl",
        key: "image",
        width: 70,
        render: (url?: string) =>
          url ? (
            <Image
              src={url}
              width={48}
              height={48}
              style={{ objectFit: "cover", borderRadius: 8 }}
              preview={false}
            />
          ) : null,
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: 320,
        ellipsis: true,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 120,
        render: (status?: string) => {
          const color =
            status === "published" ? "green" : status === "draft" ? "orange" : "red";
          return <Tag color={color}>{status?.toUpperCase()}</Tag>;
        },
      },
      {
        title: "Publish Date",
        dataIndex: "publishAt",
        key: "publishAt",
        width: 200,
        render: (date?: string | number | Date) =>
          date ? new Date(date).toLocaleString() : "--",
      },
      {
        title: "Actions",
        key: "actions",
        fixed: "right",
        width: 360,
        render: (_: any, record: PostMeta) => (
          <Space>
            <Button
              type="primary"
              onClick={() =>
                navigate(`/user/workspace/${siteId}/post/${record.slug}`)
              }
            >
              View
            </Button>
            <Button onClick={() => handleEdit(record)}>Edit</Button>
            <Button danger onClick={() => handleDelete(record)}>
              Delete
            </Button>
            <Button onClick={() => handleClearPostCache(record.slug)}>
              Clear Cache
            </Button>
          </Space>
        ),
      },
    ],
    [navigate, siteId]
  );

  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2} style={{ marginBottom: 0 }}>
            Posts
          </Title>
          <Text>Browse and manage your workspace posts. Click a post to view details.</Text>
        </Col>
        <Col>
          <Space wrap>
            <Select
              style={{ minWidth: 160 }}
              value={category}
              options={categoryOptions.filter((opt) => opt.value !== "")}
              onChange={setCategory}
              placeholder="Filter by category"
            />
            <DatePicker.RangePicker
              onChange={(v) => setDateRange(v as [Dayjs, Dayjs] | null)}
              allowClear
              style={{ minWidth: 240 }}
              format="YYYY-MM-DD"
              placeholder={["From", "To"]}
            />
            <Button type="primary" onClick={handleAdd}>
              Add Post
            </Button>
            <Button onClick={handleClearLatestCache}>Clear Latest Cache</Button>
          </Space>
        </Col>
      </Row>

      <Table<PostMeta>
        columns={columns}
        dataSource={filteredPosts}
        rowKey="id"
        pagination={{ pageSize: 40 }}
        bordered
        size="middle"
        loading={loading}
        scroll={{ x: 900 }}
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
        destroyOnClose
        afterOpenChange={(open) => {
          if (open && editingPost) {
            form.setFieldsValue({
              ...editingPost,
              subtitle: editingPost.subtitle || "",
              featuredImageUrl: editingPost.featuredImageUrl || "",
            });
          } else if (open && !editingPost) {
            form.resetFields();
          }
        }}
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Post title" />
          </Form.Item>
          <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
            <Input placeholder="unique-post-slug" />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select
              options={categoryOptions.filter((opt) => opt.value !== "")}
              placeholder="Select category"
              allowClear
            />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select
              options={[
                { value: "draft", label: "draft" },
                { value: "published", label: "published" },
                { value: "archived", label: "archived" },
              ]}
              placeholder="Select status"
            />
          </Form.Item>
          <Form.Item name="featuredImageUrl" label="Featured Image URL">
            <Input placeholder="https://example.com/your-image.jpg" />
          </Form.Item>
          <Form.Item name="subtitle" label="Subtitle">
            <Input placeholder="Short subtitle..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Posts;
