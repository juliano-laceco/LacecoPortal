USE [master]
GO
/****** Object:  Database [LacecoDB]    Script Date: 02/05/2024 4:27:53 PM ******/
CREATE DATABASE [LacecoDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'LacecoDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER01\MSSQL\DATA\LacecoDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'LacecoDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER01\MSSQL\DATA\LacecoDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [LacecoDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [LacecoDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [LacecoDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [LacecoDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [LacecoDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [LacecoDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [LacecoDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [LacecoDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [LacecoDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [LacecoDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [LacecoDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [LacecoDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [LacecoDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [LacecoDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [LacecoDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [LacecoDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [LacecoDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [LacecoDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [LacecoDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [LacecoDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [LacecoDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [LacecoDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [LacecoDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [LacecoDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [LacecoDB] SET RECOVERY FULL 
GO
ALTER DATABASE [LacecoDB] SET  MULTI_USER 
GO
ALTER DATABASE [LacecoDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [LacecoDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [LacecoDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [LacecoDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [LacecoDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [LacecoDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'LacecoDB', N'ON'
GO
ALTER DATABASE [LacecoDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [LacecoDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [LacecoDB]
GO
/****** Object:  Schema [Authorization]    Script Date: 02/05/2024 4:27:53 PM ******/
CREATE SCHEMA [Authorization]
GO
/****** Object:  Schema [Client]    Script Date: 02/05/2024 4:27:53 PM ******/
CREATE SCHEMA [Client]
GO
/****** Object:  Schema [Employee]    Script Date: 02/05/2024 4:27:53 PM ******/
CREATE SCHEMA [Employee]
GO
/****** Object:  Schema [Holiday]    Script Date: 02/05/2024 4:27:53 PM ******/
CREATE SCHEMA [Holiday]
GO
/****** Object:  Schema [Lookup]    Script Date: 02/05/2024 4:27:53 PM ******/
CREATE SCHEMA [Lookup]
GO
/****** Object:  Schema [Project]    Script Date: 02/05/2024 4:27:53 PM ******/
CREATE SCHEMA [Project]
GO
/****** Object:  Table [Authorization].[permission]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Authorization].[permission](
	[permission_id] [int] IDENTITY(1,1) NOT NULL,
	[permission_name] [varchar](255) NOT NULL,
 CONSTRAINT [PK_permission] PRIMARY KEY CLUSTERED 
(
	[permission_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Authorization].[role]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Authorization].[role](
	[role_id] [int] IDENTITY(1,1) NOT NULL,
	[role_name] [varchar](255) NOT NULL,
 CONSTRAINT [PK_role_1] PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Authorization].[role_permission]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Authorization].[role_permission](
	[role_permission_id] [int] NOT NULL,
	[role_id] [int] NOT NULL,
	[permission_id] [int] NOT NULL,
 CONSTRAINT [PK_role_permission] PRIMARY KEY CLUSTERED 
(
	[role_permission_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Client].[client]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Client].[client](
	[client_id] [int] IDENTITY(1,1) NOT NULL,
	[client_name] [varchar](255) NOT NULL,
	[joined_on] [date] NOT NULL,
	[geography] [nvarchar](255) NOT NULL,
	[sector] [varchar](255) NOT NULL,
	[website] [varchar](255) NULL,
 CONSTRAINT [clients_client_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[client_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Client].[client_contact]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Client].[client_contact](
	[client_contact_id] [int] IDENTITY(1,1) NOT NULL,
	[contact_name] [varchar](255) NOT NULL,
	[contact_info] [varchar](255) NOT NULL,
	[contact_location] [varchar](255) NOT NULL,
	[client_id] [int] NOT NULL,
 CONSTRAINT [client_contact_id] PRIMARY KEY NONCLUSTERED 
(
	[client_contact_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[grade_history]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[grade_history](
	[grade_history_id] [int] NOT NULL,
	[employee_id] [int] NOT NULL,
	[old_grade_id] [int] NULL,
	[new_grade_id] [int] NOT NULL,
	[changed_on] [date] NOT NULL,
 CONSTRAINT [PK_grade_history] PRIMARY KEY CLUSTERED 
(
	[grade_history_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Employee].[employee]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Employee].[employee](
	[employee_id] [int] IDENTITY(1,1) NOT NULL,
	[google_sub] [varchar](500) NULL,
	[first_name] [varchar](255) NOT NULL,
	[last_name] [varchar](255) NOT NULL,
	[work_email] [varchar](255) NOT NULL,
	[date_of_birth] [date] NOT NULL,
	[nationality] [varchar](500) NOT NULL,
	[marital_status] [nchar](10) NOT NULL,
	[discipline_id] [int] NOT NULL,
	[employee_hourly_cost] [float] NOT NULL,
	[major] [varchar](500) NOT NULL,
	[years_of_experience] [int] NOT NULL,
	[contract_type_id] [int] NOT NULL,
	[contract_valid_till] [date] NULL,
	[position_id] [int] NOT NULL,
	[grade_id] [int] NOT NULL,
	[country] [nchar](10) NOT NULL,
	[status_id] [int] NOT NULL,
	[created_on] [date] NOT NULL,
 CONSTRAINT [employee_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[employee_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Employee].[employee_status_history]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Employee].[employee_status_history](
	[employee_status_history_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[old_status_id] [int] NOT NULL,
	[new_status_id] [int] NOT NULL,
	[changed_on] [date] NOT NULL,
 CONSTRAINT [PK_employee_status_history] PRIMARY KEY CLUSTERED 
(
	[employee_status_history_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Employee].[grade]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Employee].[grade](
	[grade_id] [int] IDENTITY(1,1) NOT NULL,
	[grade_code] [bigint] NOT NULL,
	[seniority_id] [int] NOT NULL,
 CONSTRAINT [grade_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[grade_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Employee].[position_history]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Employee].[position_history](
	[position_history_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[position_change_type] [varchar](255) NOT NULL,
	[old_position_id] [int] NULL,
	[new_position_id] [int] NULL,
	[old_employee_hourly_cost] [float] NOT NULL,
	[new_employee_hourly_cost] [float] NOT NULL,
	[changed_on] [date] NOT NULL,
 CONSTRAINT [PK_position_history] PRIMARY KEY CLUSTERED 
(
	[position_history_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Employee].[seniority]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Employee].[seniority](
	[seniority_id] [int] IDENTITY(1,1) NOT NULL,
	[seniority_type] [varchar](255) NOT NULL,
	[seniority_level] [varchar](255) NOT NULL,
 CONSTRAINT [grades_grade_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[seniority_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Holiday].[holiday]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Holiday].[holiday](
	[holiday_id] [int] IDENTITY(1,1) NOT NULL,
	[holiday_name] [varchar](255) NOT NULL,
 CONSTRAINT [PK_holiday] PRIMARY KEY CLUSTERED 
(
	[holiday_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Holiday].[holiday_year]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Holiday].[holiday_year](
	[holiday_year_id] [int] IDENTITY(1,1) NOT NULL,
	[year] [varchar](4) NOT NULL,
	[holiday_start_date] [date] NOT NULL,
	[holiday_end_date] [date] NOT NULL,
	[holiday_id] [int] NOT NULL,
 CONSTRAINT [PK_holiday_year] PRIMARY KEY CLUSTERED 
(
	[holiday_year_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Holiday].[schedule]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Holiday].[schedule](
	[schedule_id] [int] IDENTITY(1,1) NOT NULL,
	[schedule_name] [varchar](255) NULL,
 CONSTRAINT [PK_schedule] PRIMARY KEY CLUSTERED 
(
	[schedule_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Holiday].[schedule_year]    Script Date: 02/05/2024 4:27:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Holiday].[schedule_year](
	[schedule_year_id] [int] IDENTITY(1,1) NOT NULL,
	[year] [varchar](4) NOT NULL,
	[schedule_start_date] [date] NOT NULL,
	[schedule_end_date] [date] NOT NULL,
	[daily_work_hours] [float] NOT NULL,
	[schedule_id] [int] NOT NULL,
 CONSTRAINT [PK_schedule_year] PRIMARY KEY CLUSTERED 
(
	[schedule_year_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Lookup].[contract_type]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Lookup].[contract_type](
	[contract_type_id] [int] IDENTITY(1,1) NOT NULL,
	[contract_type_name] [varchar](255) NOT NULL,
 CONSTRAINT [contract_types_contract_type_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[contract_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Lookup].[discipline]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Lookup].[discipline](
	[discipline_id] [int] IDENTITY(1,1) NOT NULL,
	[discipline_name] [varchar](255) NOT NULL,
	[assigned_on] [date] NOT NULL,
	[head_of_department_id] [int] NOT NULL,
	[division_id] [int] NULL,
 CONSTRAINT [disciplines_discipline_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[discipline_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Lookup].[division]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Lookup].[division](
	[division_id] [int] IDENTITY(1,1) NOT NULL,
	[division_name] [varchar](255) NOT NULL,
 CONSTRAINT [PK_Division] PRIMARY KEY CLUSTERED 
(
	[division_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Lookup].[employee_status]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Lookup].[employee_status](
	[employee_status_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_status_name] [varchar](255) NOT NULL,
 CONSTRAINT [employee_statuses_status_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[employee_status_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Lookup].[phase_status]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Lookup].[phase_status](
	[phase_status_id] [int] IDENTITY(1,1) NOT NULL,
	[phase_status_name] [bigint] NOT NULL,
 CONSTRAINT [phase_statuses_status_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[phase_status_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Lookup].[position]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Lookup].[position](
	[position_id] [int] IDENTITY(1,1) NOT NULL,
	[position_name] [varchar](255) NOT NULL,
 CONSTRAINT [positions_position_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[position_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Lookup].[project_category]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Lookup].[project_category](
	[project_category_id] [int] IDENTITY(1,1) NOT NULL,
	[project_category_name] [varchar](255) NOT NULL,
 CONSTRAINT [category_category_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[project_category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Lookup].[project_status]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Lookup].[project_status](
	[project_status_id] [int] IDENTITY(1,1) NOT NULL,
	[project_status_name] [bigint] NOT NULL,
 CONSTRAINT [project_statuses_status_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[project_status_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Project].[employee_work_day]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Project].[employee_work_day](
	[employee_work_day_id] [int] IDENTITY(1,1) NOT NULL,
	[phase_assignee_id] [int] NOT NULL,
	[work_day] [date] NOT NULL,
	[hours_worked] [float] NOT NULL,
	[status] [nvarchar](255) NOT NULL,
	[actioned_by] [int] NOT NULL,
	[actioned_on] [datetime] NOT NULL,
	[rejection_reason] [varchar](255) NULL,
 CONSTRAINT [PK_employee_work_day] PRIMARY KEY CLUSTERED 
(
	[employee_work_day_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Project].[employee_work_day_versions]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Project].[employee_work_day_versions](
	[employee_work_day_id] [int] IDENTITY(1,1) NOT NULL,
	[phase_assignee_id] [int] NOT NULL,
	[work_day] [date] NOT NULL,
	[hours_worked] [float] NOT NULL,
	[status] [nvarchar](255) NOT NULL,
	[actioned_by] [int] NOT NULL,
	[actioned_on] [datetime] NOT NULL,
	[rejection_reason] [varchar](255) NULL,
 CONSTRAINT [PK_employee_work_day_versions] PRIMARY KEY CLUSTERED 
(
	[employee_work_day_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Project].[phase]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Project].[phase](
	[phase_id] [int] IDENTITY(1,1) NOT NULL,
	[phase_name] [bigint] NOT NULL,
	[project_id] [int] NOT NULL,
	[actioned_by] [int] NOT NULL,
	[actioned_on] [date] NOT NULL,
	[planned_startdate] [date] NOT NULL,
	[planned_enddate] [date] NOT NULL,
	[start_date] [date] NULL,
	[end_date] [date] NULL,
	[status_id] [int] NOT NULL,
 CONSTRAINT [project_phases_phase_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[phase_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Project].[phase_assignee]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Project].[phase_assignee](
	[phase_assignee_id] [int] IDENTITY(1,1) NOT NULL,
	[assignee_id] [int] NOT NULL,
	[work_done_hrs] [int] NOT NULL,
	[expected_work_hrs] [int] NOT NULL,
	[expected_start_date] [date] NOT NULL,
	[phase_id] [int] NOT NULL,
 CONSTRAINT [phase_assignees_phase_assignee_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[phase_assignee_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Project].[phase_assignee_versions]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Project].[phase_assignee_versions](
	[phase_assignee_id] [int] IDENTITY(1,1) NOT NULL,
	[assignee_id] [int] NOT NULL,
	[work_done_hrs] [bigint] NOT NULL,
	[expected_work_hrs] [bigint] NOT NULL,
	[expected_start_date] [date] NOT NULL,
	[phase_id] [int] NOT NULL,
 CONSTRAINT [PK_phase_assignee_versions] PRIMARY KEY CLUSTERED 
(
	[phase_assignee_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Project].[phase_history]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Project].[phase_history](
	[phase_history_id] [int] IDENTITY(1,1) NOT NULL,
	[phase_id] [int] NOT NULL,
	[actioned_on] [date] NOT NULL,
	[old_end_date] [date] NOT NULL,
	[new_end_date] [date] NOT NULL,
	[justification] [varchar](255) NOT NULL,
 CONSTRAINT [PK_phase_history] PRIMARY KEY CLUSTERED 
(
	[phase_history_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Project].[phase_versions]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Project].[phase_versions](
	[phase_id] [int] IDENTITY(1,1) NOT NULL,
	[phase_name] [bigint] NOT NULL,
	[actioned_by] [int] NOT NULL,
	[actioned_on] [date] NOT NULL,
	[planned_startdate] [date] NOT NULL,
	[planned_enddate] [date] NOT NULL,
	[start_date] [date] NOT NULL,
	[end_date] [date] NOT NULL,
	[status_id] [int] NOT NULL,
	[initial_phase_id] [int] NOT NULL,
	[version] [int] NOT NULL,
 CONSTRAINT [project_phases_versions_phase_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[phase_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Project].[project_comment]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Project].[project_comment](
	[comment_id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [int] NOT NULL,
	[comment_text] [varchar](255) NOT NULL,
	[poster_id] [int] NOT NULL,
	[is_reply] [bit] NOT NULL,
	[reply_to_id] [int] NULL,
	[posted_on] [bigint] NOT NULL,
 CONSTRAINT [project_comments_comment_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[comment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Project].[projected_work_week]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Project].[projected_work_week](
	[projected_work_week_id] [int] IDENTITY(1,1) NOT NULL,
	[phase_assignee_id] [int] NOT NULL,
	[week_start] [date] NOT NULL,
	[hours_expected] [int] NOT NULL,
 CONSTRAINT [PK_projected_work_week] PRIMARY KEY CLUSTERED 
(
	[projected_work_week_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Project].[projected_work_week_versions]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Project].[projected_work_week_versions](
	[projected_work_week_id] [int] IDENTITY(1,1) NOT NULL,
	[phase_assignee_id] [int] NOT NULL,
	[week_start] [date] NOT NULL,
	[hours_expected] [int] NOT NULL,
 CONSTRAINT [PK_projected_work_week_versions] PRIMARY KEY CLUSTERED 
(
	[projected_work_week_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Project].[projects]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Project].[projects](
	[project_id] [int] IDENTITY(1,1) NOT NULL,
	[code] [varchar](255) NOT NULL,
	[title] [varchar](255) NOT NULL,
	[client_id] [int] NOT NULL,
	[geography] [varchar](255) NOT NULL,
	[baseline_budget] [bigint] NOT NULL,
	[variance] [float] NOT NULL,
	[BUA] [int] NOT NULL,
	[Landscape] [int] NOT NULL,
	[ParkingArea] [int] NOT NULL,
	[DesignArea] [int] NOT NULL,
	[planned_startdate] [date] NOT NULL,
	[planned_enddate] [date] NOT NULL,
	[start_date] [date] NULL,
	[end_date] [date] NULL,
	[created_on] [datetime] NOT NULL,
	[head_of_department_id] [int] NOT NULL,
	[project_status_id] [int] NOT NULL,
	[category_id] [int] NOT NULL,
	[created_by] [int] NOT NULL,
 CONSTRAINT [projects_project_id_primary] PRIMARY KEY NONCLUSTERED 
(
	[project_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Project].[projects_versions]    Script Date: 02/05/2024 4:27:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Project].[projects_versions](
	[project_id] [int] NOT NULL,
	[code] [varchar](255) NOT NULL,
	[title] [varchar](255) NOT NULL,
	[client_id] [int] NOT NULL,
	[geography] [varchar](255) NOT NULL,
	[baseline_budget] [bigint] NOT NULL,
	[variance] [float] NOT NULL,
	[BUA] [int] NOT NULL,
	[Landscape] [int] NOT NULL,
	[ParkingArea] [int] NOT NULL,
	[DesignArea] [int] NOT NULL,
	[planned_startdate] [date] NOT NULL,
	[planned_enddate] [date] NOT NULL,
	[start_date] [date] NULL,
	[end_date] [date] NULL,
	[created_on] [date] NOT NULL,
	[head_of_department_id] [int] NOT NULL,
	[project_status_id] [int] NOT NULL,
	[category_id] [int] NOT NULL,
	[intial_project_id] [int] NOT NULL,
	[created_by] [int] NOT NULL,
 CONSTRAINT [PK_projects_versions] PRIMARY KEY CLUSTERED 
(
	[project_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Project].[projects] ADD  CONSTRAINT [DF_projects_variance]  DEFAULT ((0)) FOR [variance]
GO
ALTER TABLE [Authorization].[role_permission]  WITH CHECK ADD  CONSTRAINT [role_permission_permission_id_foreign] FOREIGN KEY([permission_id])
REFERENCES [Authorization].[permission] ([permission_id])
GO
ALTER TABLE [Authorization].[role_permission] CHECK CONSTRAINT [role_permission_permission_id_foreign]
GO
ALTER TABLE [Authorization].[role_permission]  WITH CHECK ADD  CONSTRAINT [role_permission_role_id_foreign] FOREIGN KEY([role_id])
REFERENCES [Authorization].[role] ([role_id])
GO
ALTER TABLE [Authorization].[role_permission] CHECK CONSTRAINT [role_permission_role_id_foreign]
GO
ALTER TABLE [Client].[client_contact]  WITH CHECK ADD  CONSTRAINT [client_client_contacts_id_foreign] FOREIGN KEY([client_id])
REFERENCES [Client].[client] ([client_id])
GO
ALTER TABLE [Client].[client_contact] CHECK CONSTRAINT [client_client_contacts_id_foreign]
GO
ALTER TABLE [dbo].[grade_history]  WITH CHECK ADD  CONSTRAINT [grade_history_employee_id_foreign] FOREIGN KEY([employee_id])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [dbo].[grade_history] CHECK CONSTRAINT [grade_history_employee_id_foreign]
GO
ALTER TABLE [dbo].[grade_history]  WITH CHECK ADD  CONSTRAINT [grade_history_grade_new_id_foreign] FOREIGN KEY([new_grade_id])
REFERENCES [Employee].[grade] ([grade_id])
GO
ALTER TABLE [dbo].[grade_history] CHECK CONSTRAINT [grade_history_grade_new_id_foreign]
GO
ALTER TABLE [dbo].[grade_history]  WITH CHECK ADD  CONSTRAINT [grade_history_grade_old_id_foreign] FOREIGN KEY([old_grade_id])
REFERENCES [Employee].[grade] ([grade_id])
GO
ALTER TABLE [dbo].[grade_history] CHECK CONSTRAINT [grade_history_grade_old_id_foreign]
GO
ALTER TABLE [Employee].[employee]  WITH CHECK ADD  CONSTRAINT [employee_grade_id_foreign] FOREIGN KEY([grade_id])
REFERENCES [Employee].[grade] ([grade_id])
GO
ALTER TABLE [Employee].[employee] CHECK CONSTRAINT [employee_grade_id_foreign]
GO
ALTER TABLE [Employee].[employee]  WITH CHECK ADD  CONSTRAINT [employees_contract_type_id_foreign] FOREIGN KEY([contract_type_id])
REFERENCES [Lookup].[contract_type] ([contract_type_id])
GO
ALTER TABLE [Employee].[employee] CHECK CONSTRAINT [employees_contract_type_id_foreign]
GO
ALTER TABLE [Employee].[employee]  WITH CHECK ADD  CONSTRAINT [employees_position_id_foreign] FOREIGN KEY([position_id])
REFERENCES [Lookup].[position] ([position_id])
GO
ALTER TABLE [Employee].[employee] CHECK CONSTRAINT [employees_position_id_foreign]
GO
ALTER TABLE [Employee].[employee]  WITH CHECK ADD  CONSTRAINT [employees_status_id_foreign] FOREIGN KEY([status_id])
REFERENCES [Lookup].[employee_status] ([employee_status_id])
GO
ALTER TABLE [Employee].[employee] CHECK CONSTRAINT [employees_status_id_foreign]
GO
ALTER TABLE [Employee].[employee_status_history]  WITH CHECK ADD  CONSTRAINT [employee_history_id_foreign] FOREIGN KEY([employee_id])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [Employee].[employee_status_history] CHECK CONSTRAINT [employee_history_id_foreign]
GO
ALTER TABLE [Employee].[employee_status_history]  WITH CHECK ADD  CONSTRAINT [employee_status_history_new_id_foreign] FOREIGN KEY([new_status_id])
REFERENCES [Lookup].[employee_status] ([employee_status_id])
GO
ALTER TABLE [Employee].[employee_status_history] CHECK CONSTRAINT [employee_status_history_new_id_foreign]
GO
ALTER TABLE [Employee].[employee_status_history]  WITH CHECK ADD  CONSTRAINT [employee_status_history_old_id_foreign] FOREIGN KEY([old_status_id])
REFERENCES [Lookup].[employee_status] ([employee_status_id])
GO
ALTER TABLE [Employee].[employee_status_history] CHECK CONSTRAINT [employee_status_history_old_id_foreign]
GO
ALTER TABLE [Employee].[grade]  WITH CHECK ADD  CONSTRAINT [grade_seniority_id_foreign] FOREIGN KEY([grade_id])
REFERENCES [Employee].[seniority] ([seniority_id])
GO
ALTER TABLE [Employee].[grade] CHECK CONSTRAINT [grade_seniority_id_foreign]
GO
ALTER TABLE [Employee].[position_history]  WITH CHECK ADD  CONSTRAINT [employee_position] FOREIGN KEY([employee_id])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [Employee].[position_history] CHECK CONSTRAINT [employee_position]
GO
ALTER TABLE [Employee].[position_history]  WITH CHECK ADD  CONSTRAINT [position_history_old_id_foreign] FOREIGN KEY([old_position_id])
REFERENCES [Lookup].[position] ([position_id])
GO
ALTER TABLE [Employee].[position_history] CHECK CONSTRAINT [position_history_old_id_foreign]
GO
ALTER TABLE [Employee].[position_history]  WITH CHECK ADD  CONSTRAINT [position_history_position_new_id_foreign] FOREIGN KEY([new_position_id])
REFERENCES [Lookup].[position] ([position_id])
GO
ALTER TABLE [Employee].[position_history] CHECK CONSTRAINT [position_history_position_new_id_foreign]
GO
ALTER TABLE [Holiday].[holiday_year]  WITH CHECK ADD  CONSTRAINT [holiday_year_holiday_id_foreign] FOREIGN KEY([holiday_id])
REFERENCES [Holiday].[holiday] ([holiday_id])
GO
ALTER TABLE [Holiday].[holiday_year] CHECK CONSTRAINT [holiday_year_holiday_id_foreign]
GO
ALTER TABLE [Holiday].[schedule_year]  WITH CHECK ADD  CONSTRAINT [FK_schedule_year_schedule] FOREIGN KEY([schedule_id])
REFERENCES [Holiday].[schedule] ([schedule_id])
GO
ALTER TABLE [Holiday].[schedule_year] CHECK CONSTRAINT [FK_schedule_year_schedule]
GO
ALTER TABLE [Lookup].[discipline]  WITH CHECK ADD  CONSTRAINT [discipline_division_id_foreign] FOREIGN KEY([division_id])
REFERENCES [Lookup].[division] ([division_id])
GO
ALTER TABLE [Lookup].[discipline] CHECK CONSTRAINT [discipline_division_id_foreign]
GO
ALTER TABLE [Lookup].[discipline]  WITH CHECK ADD  CONSTRAINT [discipline_employee_hod_if_foreign] FOREIGN KEY([head_of_department_id])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [Lookup].[discipline] CHECK CONSTRAINT [discipline_employee_hod_if_foreign]
GO
ALTER TABLE [Project].[employee_work_day]  WITH CHECK ADD  CONSTRAINT [employee_work_day_employee_id_foreign] FOREIGN KEY([actioned_by])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [Project].[employee_work_day] CHECK CONSTRAINT [employee_work_day_employee_id_foreign]
GO
ALTER TABLE [Project].[employee_work_day]  WITH CHECK ADD  CONSTRAINT [employee_work_day_phase_assignee_id_foreign] FOREIGN KEY([phase_assignee_id])
REFERENCES [Project].[phase_assignee] ([phase_assignee_id])
GO
ALTER TABLE [Project].[employee_work_day] CHECK CONSTRAINT [employee_work_day_phase_assignee_id_foreign]
GO
ALTER TABLE [Project].[employee_work_day_versions]  WITH CHECK ADD  CONSTRAINT [employee_work_day_versions_employee_actioned_by_id_foreign] FOREIGN KEY([actioned_by])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [Project].[employee_work_day_versions] CHECK CONSTRAINT [employee_work_day_versions_employee_actioned_by_id_foreign]
GO
ALTER TABLE [Project].[employee_work_day_versions]  WITH CHECK ADD  CONSTRAINT [employee_work_day_versions_employee_approved_by_id_foreign] FOREIGN KEY([actioned_by])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [Project].[employee_work_day_versions] CHECK CONSTRAINT [employee_work_day_versions_employee_approved_by_id_foreign]
GO
ALTER TABLE [Project].[employee_work_day_versions]  WITH CHECK ADD  CONSTRAINT [employee_work_day_versions_phase_assignee_versions_id_foreign] FOREIGN KEY([phase_assignee_id])
REFERENCES [Project].[phase_assignee_versions] ([phase_assignee_id])
GO
ALTER TABLE [Project].[employee_work_day_versions] CHECK CONSTRAINT [employee_work_day_versions_phase_assignee_versions_id_foreign]
GO
ALTER TABLE [Project].[phase]  WITH CHECK ADD  CONSTRAINT [phase_employee_actioned_by_id_foreign] FOREIGN KEY([actioned_by])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [Project].[phase] CHECK CONSTRAINT [phase_employee_actioned_by_id_foreign]
GO
ALTER TABLE [Project].[phase]  WITH CHECK ADD  CONSTRAINT [phase_phase_statuses_id_foreign] FOREIGN KEY([status_id])
REFERENCES [Lookup].[phase_status] ([phase_status_id])
GO
ALTER TABLE [Project].[phase] CHECK CONSTRAINT [phase_phase_statuses_id_foreign]
GO
ALTER TABLE [Project].[phase]  WITH CHECK ADD  CONSTRAINT [project_phases_project_id_foreign] FOREIGN KEY([project_id])
REFERENCES [Project].[projects] ([project_id])
GO
ALTER TABLE [Project].[phase] CHECK CONSTRAINT [project_phases_project_id_foreign]
GO
ALTER TABLE [Project].[phase_assignee]  WITH CHECK ADD  CONSTRAINT [phase_assignee_phase_id_foreign] FOREIGN KEY([phase_id])
REFERENCES [Project].[phase] ([phase_id])
GO
ALTER TABLE [Project].[phase_assignee] CHECK CONSTRAINT [phase_assignee_phase_id_foreign]
GO
ALTER TABLE [Project].[phase_assignee]  WITH CHECK ADD  CONSTRAINT [phase_assignees_employees_id_foreign] FOREIGN KEY([assignee_id])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [Project].[phase_assignee] CHECK CONSTRAINT [phase_assignees_employees_id_foreign]
GO
ALTER TABLE [Project].[phase_assignee_versions]  WITH CHECK ADD  CONSTRAINT [phase_assignee_versions_employee_id_foreign] FOREIGN KEY([assignee_id])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [Project].[phase_assignee_versions] CHECK CONSTRAINT [phase_assignee_versions_employee_id_foreign]
GO
ALTER TABLE [Project].[phase_assignee_versions]  WITH CHECK ADD  CONSTRAINT [phase_assignee_versions_phase_versions_id_foreign] FOREIGN KEY([phase_id])
REFERENCES [Project].[phase_versions] ([phase_id])
GO
ALTER TABLE [Project].[phase_assignee_versions] CHECK CONSTRAINT [phase_assignee_versions_phase_versions_id_foreign]
GO
ALTER TABLE [Project].[phase_history]  WITH CHECK ADD  CONSTRAINT [phase_phase_history_id_foreign] FOREIGN KEY([phase_id])
REFERENCES [Project].[phase] ([phase_id])
GO
ALTER TABLE [Project].[phase_history] CHECK CONSTRAINT [phase_phase_history_id_foreign]
GO
ALTER TABLE [Project].[phase_versions]  WITH CHECK ADD  CONSTRAINT [phase_versions_phase_id_foreign] FOREIGN KEY([initial_phase_id])
REFERENCES [Project].[phase] ([phase_id])
GO
ALTER TABLE [Project].[phase_versions] CHECK CONSTRAINT [phase_versions_phase_id_foreign]
GO
ALTER TABLE [Project].[phase_versions]  WITH CHECK ADD  CONSTRAINT [phase_versions_phase_status_id_foreign] FOREIGN KEY([status_id])
REFERENCES [Lookup].[phase_status] ([phase_status_id])
GO
ALTER TABLE [Project].[phase_versions] CHECK CONSTRAINT [phase_versions_phase_status_id_foreign]
GO
ALTER TABLE [Project].[project_comment]  WITH CHECK ADD  CONSTRAINT [project_comment_employee_id_foreign] FOREIGN KEY([poster_id])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [Project].[project_comment] CHECK CONSTRAINT [project_comment_employee_id_foreign]
GO
ALTER TABLE [Project].[project_comment]  WITH CHECK ADD  CONSTRAINT [project_project_comments_id_foreign] FOREIGN KEY([project_id])
REFERENCES [Project].[projects] ([project_id])
GO
ALTER TABLE [Project].[project_comment] CHECK CONSTRAINT [project_project_comments_id_foreign]
GO
ALTER TABLE [Project].[projected_work_week]  WITH CHECK ADD  CONSTRAINT [work_week_phase_assignee_id_foreign] FOREIGN KEY([phase_assignee_id])
REFERENCES [Project].[phase_assignee] ([phase_assignee_id])
GO
ALTER TABLE [Project].[projected_work_week] CHECK CONSTRAINT [work_week_phase_assignee_id_foreign]
GO
ALTER TABLE [Project].[projected_work_week_versions]  WITH CHECK ADD  CONSTRAINT [projected_work_week_versions_phase_assignee_versions_id_foreign] FOREIGN KEY([phase_assignee_id])
REFERENCES [Project].[phase_assignee_versions] ([phase_assignee_id])
GO
ALTER TABLE [Project].[projected_work_week_versions] CHECK CONSTRAINT [projected_work_week_versions_phase_assignee_versions_id_foreign]
GO
ALTER TABLE [Project].[projects]  WITH CHECK ADD  CONSTRAINT [project_category_id_foreign] FOREIGN KEY([category_id])
REFERENCES [Lookup].[project_category] ([project_category_id])
GO
ALTER TABLE [Project].[projects] CHECK CONSTRAINT [project_category_id_foreign]
GO
ALTER TABLE [Project].[projects]  WITH CHECK ADD  CONSTRAINT [projects_client_id_foreign] FOREIGN KEY([client_id])
REFERENCES [Client].[client] ([client_id])
GO
ALTER TABLE [Project].[projects] CHECK CONSTRAINT [projects_client_id_foreign]
GO
ALTER TABLE [Project].[projects]  WITH CHECK ADD  CONSTRAINT [projects_employee_created_by_id_foreign] FOREIGN KEY([created_by])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [Project].[projects] CHECK CONSTRAINT [projects_employee_created_by_id_foreign]
GO
ALTER TABLE [Project].[projects]  WITH CHECK ADD  CONSTRAINT [projects_hod_employee_id_foreign] FOREIGN KEY([head_of_department_id])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [Project].[projects] CHECK CONSTRAINT [projects_hod_employee_id_foreign]
GO
ALTER TABLE [Project].[projects]  WITH CHECK ADD  CONSTRAINT [projects_status_id_foreign] FOREIGN KEY([project_status_id])
REFERENCES [Lookup].[project_status] ([project_status_id])
GO
ALTER TABLE [Project].[projects] CHECK CONSTRAINT [projects_status_id_foreign]
GO
ALTER TABLE [Project].[projects_versions]  WITH CHECK ADD  CONSTRAINT [projects_versions_client_id_foreign] FOREIGN KEY([client_id])
REFERENCES [Client].[client] ([client_id])
GO
ALTER TABLE [Project].[projects_versions] CHECK CONSTRAINT [projects_versions_client_id_foreign]
GO
ALTER TABLE [Project].[projects_versions]  WITH CHECK ADD  CONSTRAINT [projects_versions_employee_created_by_id_foreign] FOREIGN KEY([created_by])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [Project].[projects_versions] CHECK CONSTRAINT [projects_versions_employee_created_by_id_foreign]
GO
ALTER TABLE [Project].[projects_versions]  WITH CHECK ADD  CONSTRAINT [projects_versions_hod_employee_id_foreign] FOREIGN KEY([head_of_department_id])
REFERENCES [Employee].[employee] ([employee_id])
GO
ALTER TABLE [Project].[projects_versions] CHECK CONSTRAINT [projects_versions_hod_employee_id_foreign]
GO
ALTER TABLE [Project].[projects_versions]  WITH CHECK ADD  CONSTRAINT [projects_versions_project_category_id_foreign] FOREIGN KEY([category_id])
REFERENCES [Lookup].[project_category] ([project_category_id])
GO
ALTER TABLE [Project].[projects_versions] CHECK CONSTRAINT [projects_versions_project_category_id_foreign]
GO
ALTER TABLE [Project].[projects_versions]  WITH CHECK ADD  CONSTRAINT [projects_versions_project_status_id_foreign] FOREIGN KEY([project_status_id])
REFERENCES [Lookup].[project_status] ([project_status_id])
GO
ALTER TABLE [Project].[projects_versions] CHECK CONSTRAINT [projects_versions_project_status_id_foreign]
GO
ALTER TABLE [Project].[projects_versions]  WITH CHECK ADD  CONSTRAINT [projects_versions_projects_id_foreign] FOREIGN KEY([intial_project_id])
REFERENCES [Project].[projects] ([project_id])
GO
ALTER TABLE [Project].[projects_versions] CHECK CONSTRAINT [projects_versions_projects_id_foreign]
GO
USE [master]
GO
ALTER DATABASE [LacecoDB] SET  READ_WRITE 
GO
