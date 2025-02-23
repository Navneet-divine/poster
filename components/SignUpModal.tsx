import { Modal } from "@mantine/core";

const SignUpModal: React.FC<{
  children: React.ReactNode;
  opened: boolean;
  close: () => void;
}> = ({ children, opened, close }) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Excited to start a journey with you!"
      className="font-raleway !dark:bg-dark-600"
      classNames={{
        content: "dark:bg-dark-700",
        header: "dark:bg-dark-700",
        close: "dark:text-dark-100 hover:bg-dark-700",
        title: "dark:text-dark-50",
      }}
      styles={{
        title: {
          fontWeight: "bold",
          fontSize: "20px",
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default SignUpModal;
