data "aws_iam_policy_document" "aws_iam_policy_document_wallet_policy_doc" {
  statement {
    sid    = ""
    effect = "Allow"

    resources = ["*"]

    actions = [
      "ecr:GetAuthorizationToken",
      "ecr:BatchCheckLayerAvailability",
      "ecr:GetDownloadUrlForLayer",
      "ecr:GetRepositoryPolicy",
      "ecr:DescribeRepositories",
      "ecr:ListImages",
      "ecr:DescribeImages",
      "ecr:BatchGetImage",
      "ecr:GetLifecyclePolicy",
      "ecr:GetLifecyclePolicyPreview",
      "ecr:ListTagsForResource",
      "ecr:DescribeImageScanFindings"
    ]
  }
}

data "aws_iam_policy_document" "data_aws_iam_policy_document_wallet" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "aws_iam_role_wallet_role" {
  name = "aws_iam_role_wallet_role"

  assume_role_policy = data.aws_iam_policy_document.data_aws_iam_policy_document_wallet.json
}

resource "aws_iam_instance_profile" "aws_iam_instance_profile_wallet_profile" {
  name = "aws_iam_instance_profile_wallet_profile"
  role = aws_iam_role.aws_iam_role_wallet_role.id
}

resource "aws_iam_role_policy" "aws_iam_role_wallet_role_policy" {
  name = "aws_iam_role_wallet_role_policy"
  role = aws_iam_role.aws_iam_role_wallet_role.id

  policy = data.aws_iam_policy_document.aws_iam_policy_document_wallet_policy_doc.json
}
